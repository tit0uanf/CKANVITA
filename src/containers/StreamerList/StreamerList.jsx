import React, { useState, useEffect } from 'react';
import { fetchStreamersDataBackground } from '../../pages/Background/streamer';
import '../../pages/Popup/Popup.css';

import Loading from '../Loading/Loading';
import Message from '../Message/Message';
import StreamerCard from './StreamerCard.jsx';
import './StreamerList.css';

const StreamerTable = (props) => {
  const [streamersData, setStreamersData] = useState();
  const { activeTab, isOneStreamerOnline, setIsOneStreamerOnline } = props;

  const fetchStreamersData = async () => {
    var fetchedStreamersData = null;
    chrome.storage.local.get('streamers').then(async ({ streamers }) => {
      if (typeof streamers === 'undefined') {
        console.log("Streamers data doesn't exists");
        fetchedStreamersData = await fetchStreamersDataBackground();
        setStreamersData(fetchedStreamersData.streamer_list);
        checkIsOneStreamerOnline(fetchedStreamersData.streamer_list);
      } else {
        console.log('Streamers data exists');
        fetchedStreamersData = streamers;
        setStreamersData(fetchedStreamersData.streamer_list);
        checkIsOneStreamerOnline(fetchedStreamersData.streamer_list);
      }
    });
  };

  const checkIsOneStreamerOnline = (streamer_list) => {
    streamer_list.forEach((streamer) => {
      if (streamer.status === 'ON') {
        setIsOneStreamerOnline(true);
      }
    });
  };

  useEffect(() => {
    fetchStreamersData();
    const interval = setInterval(() => {
      fetchStreamersData();
    }, 1000 * 60 * 0.5);
    return () => clearInterval(interval);
  });

  return streamersData ? (
    isOneStreamerOnline ? (
      <div>
        {streamersData.map((streamer) => {
          if (streamer.status === 'ON') {
            return <StreamerCard streamer={streamer} />;
          }
        })}
      </div>
    ) : (
      <Message activeTab={activeTab} />
    )
  ) : (
    <div className='" flex items-center justify-center h-5/6'>
      <Loading />
    </div>
  );
};

export default StreamerTable;
