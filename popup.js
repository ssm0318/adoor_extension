// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("alarm-on-off").innerHTML = localStorage.getItem("name");
}, false);

function setAlarm(event) {
  chrome.alarms.create({delayInMinutes: 0});

  $.ajax({                                                
    type: "GET",                                        
    url: "https://adoor.app/unread",
    contentType: "application/json; charset=utf-8",
    success: function(data) {
      localStorage.name = data.name;
      if(localStorage.getItem("ids") === null) {
        localStorage.new = JSON.stringify(data.id);
        localStorage.count = data.id.length.toString();
      } else {
        localStorage.new = difference(data.id, JSON.parse(localStorage.getItem("ids")));
        localStorage.count = difference(data.id, JSON.parse(localStorage.getItem("ids"))).length;
      }
      localStorage.setItem("ids", JSON.stringify(data.id));
      updateIcon();
      // setTimeout(function(){
      //   window.close();
      // }, 5000);
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

document.getElementById('alarm-on-off').addEventListener('click', function(){
  if(localStorage.alarm == "on") {
    localStorage.alarm = "off";
    $("#alarm-on-off").prop('value', '알림 설정 끄기');
  } else if(localStorage.alarm == "off") {
    localStorage.alarm = "on";
    $("#alarm-on-off").prop('value', '알림 설정 켜기');
  } else if(localStorage.alarm == "nil") {
    chrome.tabs.create({ active: true, url : "https://adoor.app" });
  }
  setAlarm();
});

