// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

function setAlarm(event) {
  // let minutes = parseFloat(event.target.value);
  chrome.browserAction.setBadgeText({text: 'ON'});
  // chrome.alarms.create({delayInMinutes: minutes});
  chrome.alarms.create({delayInMinutes: 0});
  // chrome.storage.sync.set({minutes: minutes});

  $.ajax({                                                
    type: "GET",                                         
    url: "https://adoor.app/unread",
    dataType: "json",                                     
    success: function(data, textStatus, request) {  

      console.log("success!");
    },                                                    
    error:function(e) {                                   
      console.log("error!");
    }                                                      
  });

  window.close();
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}

document.getElementById('alarm-on-off').addEventListener('click', setAlarm);