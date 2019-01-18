// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

chrome.alarms.onAlarm.addListener(function() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  'icon.png',
      title:    '어도어(adoor)',
      message:  '새로운 노티가 도착했습니다.',
      buttons: [
        {title: 'Check Notifications'}
      ],
      priority: 0});
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(['minutes'], function(item) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.tabs.create({ active: true, url : "https://adoor.app" });
    chrome.alarms.create({delayInMinutes: item.minutes});
  });
});

// var count = 0;
// Array.prototype.forEach.call(x, function(el) {
// if (el.className.split(' ')[1] == 'unread') {
// 		 console.log("unread");
//     count++;
//     }
// });