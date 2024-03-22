import { fetchMatchesDataBackground } from './match';
import { fetchStreamersDataBackground } from './streamer';

chrome.runtime.onStartup.addListener(async () => {
  console.log('Extension started up... ');
  chrome.alarms.clearAll();
  chrome.storage.local.remove(
    [
      'standings_lec',
      'standings_lfl',
      'standings_vct',
      'results_lec',
      'results_lfl',
      'results_vct',
      'results_cs',
      'results_rl',
    ],
    function () {
      console.log('Clearing standings');
      var error = chrome.runtime.lastError;
      if (error) {
        console.error(error);
      }
    }
  );
  chrome.alarms.create('periodic1min', {
    when: Date.now(),
    periodInMinutes: 1,
  });
  chrome.alarms.create('periodic5min', {
    when: Date.now(),
    periodInMinutes: 5,
  });
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === 'periodic1min') {
    console.log('1 minute elapsed...');
    fetchStreamersDataBackground();
  } else if (alarm.name === 'periodic5min') {
    console.log('5 minute elapsed..');
    fetchMatchesDataBackground();
  }
});
