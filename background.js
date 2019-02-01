// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

setInterval(setAlarm, 1000);

chrome.browserAction.onClicked.addListener(goToInbox);

function getAdoorUrl() {
  return "https://adoor.app";
}

function isAdoorUrl(url) {
  return url.startsWith(getAdoorUrl());
}

function goToInbox() {
  console.log('알림 페이지로 이동 중...');
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isAdoorUrl(tab.url)) {
        console.log('Found Adoor tab: ' + tab.url + '. ' +
                    'Focusing and refreshing count...');
        chrome.tabs.update(tab.id, {selected: true});
        return;
      }
    }
    console.log('Could not find Adoor tab. Creating one...');
    chrome.tabs.create({url: getAdoorUrl()});
  });
}

var filters = {
  url: [{urlContains: getAdoorUrl().replace(/^https?\:\/\//, '')}]
};

function onNavigate(details) {
  if (details.url && isAdoorUrl(details.url)) {
    console.log('Recognized Adoor navigation to: ' + details.url + '.' +
                'Refreshing count...');
    // startRequest({scheduleRequest:false, showLoadingAnimation:false});
  }
}
if (chrome.webNavigation && chrome.webNavigation.onDOMContentLoaded &&
    chrome.webNavigation.onReferenceFragmentUpdated) {
  chrome.webNavigation.onDOMContentLoaded.addListener(onNavigate, filters);
  chrome.webNavigation.onReferenceFragmentUpdated.addListener(
      onNavigate, filters);
} else {
  chrome.tabs.onUpdated.addListener(function(_, details) {
    onNavigate(details);
  });
}

chrome.notifications.onButtonClicked.addListener(function() {
  goToInbox();
});

function setAlarm(event) {
  $.ajax({                                                
    type: "GET",                                        
    url: "https://adoor.app/unread",
    contentType: "application/json; charset=utf-8",
    success: function(data) {
      localStorage.name = data.name;
      if(localStorage.getItem("ids") === null) {
        localStorage.new = JSON.stringify(data.id); 
      } else {
        localStorage.new = difference(data.id, JSON.parse(localStorage.getItem("ids")));
      }
      localStorage.count = data.id.length.toString();
      if(localStorage.getItem("new") !== "" && localStorage.alarm == "on") {
        chrome.alarms.create({delayInMinutes: 0});
        chrome.notifications.create({
          type:     'basic',
          iconUrl:  'icon.png',
          title:    '어도어(adoor)',
          message:  '새로운 노티가 도착했습니다.',
          buttons: [
            {title: 'Check Notifications'}
          ],
          priority: 0});
      }
      localStorage.setItem("ids", JSON.stringify(data.id));
      updateIcon();
    },                                                    
      error: function(e) {
        console.log(e);
        chrome.browserAction.setBadgeText({text: "ERROR"});
    }                                                      
  });
}

function difference(a1, a2) {
  var result = [];
  for (var i = 0; i < a1.length; i++) {
    if (a2.indexOf(a1[i]) === -1) {
      result.push(a1[i]);
    }
  }
  return result;
}

function updateIcon() {
  if (localStorage.name == "akdfasldksladlsakvlsfjaoifnowknalkvnkvdowisvdknlweoifjwe") {
    chrome.browserAction.setIcon({path: "icon19-bnw.png"});
    chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
    chrome.browserAction.setBadgeText({text: "?"});
    localStorage.alarm = "nil"
    $("#alarm-on-off").prop('value', '로그인');
    console.log("successful!");
  } else {
    chrome.browserAction.setIcon({path: "icon19.png"});
    chrome.browserAction.setBadgeBackgroundColor({color:[244, 132, 98, 255]});
    chrome.browserAction.setBadgeText({ text: localStorage.count });
    if(localStorage.getItem("alarm") === null || localStorage.alarm == "nil") {
      $("#alarm-on-off").prop('value', '알림 설정 끄기');
      localStorage.alarm = "on";
      console.log("success!");
    } else if (localStorage.alarm == "on") {
      $("#alarm-on-off").prop('value', '알림 설정 끄기');
    } else {
      $("#alarm-on-off").prop('value', '알림 설정 켜기');
    }
  }
}
