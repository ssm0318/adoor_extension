// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

function setAlarm(event) {
  let minutes = parseFloat(event.target.value);
  chrome.browserAction.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});

  $.ajax({                                                
    type: "GET",                                         
    url: "http://localhost:3000/test",
    // headers: json,                                        
    dataType: "json",                                     
    // data: {user: localStorage.getItem('yeahapUser')},     
    success: function(data, textStatus, request) {        
      // option 2 : true -> excute resetToken()           
    //   setLocalStorage(data, true, request);               
    //   $('#shortcut-items').empty();                       
    //   setShortcut(data.shortcut);                         
        // console.log(data.name);
        $("body").html("<p>" + data.name + "</p>");
    },                                                    
    error:function(e) {                                   
      //alert(e.responseText);                            
    //   chrome.tabs.create({url: FRONT + "/users/sign_in"});
        $("body").html("<p>ERROR!!!</p>");
        //console.log("error!");
    }                                                     
  });

//   window.close();
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}

//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute incriments if released
document.getElementById('sampleSecond').addEventListener('click', setAlarm);