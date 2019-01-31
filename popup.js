// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

function setAlarm(event) {
  chrome.alarms.create({delayInMinutes: 0});

  $.ajax({                                                
    type: "GET",                                        
    url: "https://adoor.app/unread",
    contentType: "application/json; charset=utf-8",
    success: function(data) {
      localStorage.name = data.name;
      localStorage.count = data.id.length.toString();
      updateIcon();
    },                                                    
      error: function(e) {
        console.log(e);
        chrome.browserAction.setBadgeText({text: "ERROR"});
    }                                                      
  });
}

function updateIcon() {
  console.log(localStorage.name);
  if (localStorage.name == "akdfasldksladlsakvlsfjaoifnowknalkvnkvdowisvdknlweoifjwe") {
    chrome.browserAction.setIcon({path: "icon19-bnw.png"});
    chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
    chrome.browserAction.setBadgeText({text: "?"});
  } else {
    chrome.browserAction.setIcon({path: "icon19.png"});
    chrome.browserAction.setBadgeBackgroundColor({color:[244, 132, 98, 255]});
    chrome.browserAction.setBadgeText({ text: localStorage.count });
  }
}

document.getElementById('alarm-on-off').addEventListener('click', function(){
  if(localStorage.alarm == "on") {
    localStorage.alarm = "off";
    $("#alarm-on-off").text('알림 설정 끄기');
  } else {
    localStorage.alarm = "on";
    $("#alarm-on-off").text('알림 설정 켜기');
  }
  setAlarm();
});