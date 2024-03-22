import { checkMatchOngoing } from './match';

const fetchStreamersDataBackground = async () => {
  console.log('Fetching streamers data... ');
  const result = await fetch(
    'https://vchecker-production.up.railway.app/status'
  );

  const fetchedStreamersData = await result.json();
  let isVitalityON = false;
  if (result.ok) {
    console.log('fetchedStreamersData', fetchedStreamersData);

    fetchedStreamersData.streamer_list.forEach((streamer) => {
      if (
        streamer.name === 'Vitality' &&
        streamer.status === 'ON' &&
        !checkMatchOngoing()
      ) {
        chrome.action.setBadgeText({ text: 'ON' });
        chrome.action.setBadgeBackgroundColor({ color: '#fae100' });
        isVitalityON = true;
      }
      if (!isVitalityON) {
        countOnlineStreamers(fetchedStreamersData.streamer_list);
      }
    });
    await chrome.storage.local
      .set({ streamers: fetchedStreamersData })
      .then(() => {
        console.log('Store streamers data');
      });

    return fetchedStreamersData;
  } else {
    console.log('Error fetching streamers data ');
  }
};

const countOnlineStreamers = (streamer_list) => {
  let count = 0;
  streamer_list.forEach((streamer) => {
    if (streamer.status === 'ON') {
      count++;
    }
  });
  if (count >= 1 && !checkMatchOngoing()) {
    chrome.action.setBadgeText({ text: count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#58a6ff' });
  } else {
    chrome.action.setBadgeText({ text: '' });
    chrome.action.setBadgeBackgroundColor({ color: '#58a6ff' });
  }
};

export { fetchStreamersDataBackground };
