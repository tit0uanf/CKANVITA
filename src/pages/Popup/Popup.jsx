import React, { useState, useEffect } from 'react';
import VLogo from '../../containers/VLogo/VLogo.jsx';
import './Popup.css';
import StreamerList from '../../containers/StreamerList/StreamerList.jsx';
import TabMenu from '../../containers/TabMenu/TabMenu.jsx';
import Settings from '../../containers/Settings/Settings.jsx';
import More from '../../containers/More/More.jsx';
import MatchList from '../../containers/MatchList/MatchList.jsx';
import Results from '../../containers/Results/Results.jsx';
import Standings from '../../containers/Standings/Standings.jsx';
import { checkMatchOngoing } from '../Background/match';
const Popup = () => {
  const [activeTab, setActiveTab] = useState('TwitchTab');
  const [isOneStreamerOnline, setIsOneStreamerOnline] = useState(false);
  const [isMatchDataAvailable, setIsMatchDataAvailable] = useState(false);
  const [isMatchOngoing, setIsMatchOngoing] = useState(checkMatchOngoing());

  const renderActiveTab = () => {
    if (activeTab === 'TwitchTab') {
      return (
        <StreamerList
          className="scrollhost"
          isOneStreamerOnline={isOneStreamerOnline}
          setIsOneStreamerOnline={setIsOneStreamerOnline}
          activeTab={activeTab}
        />
      );
    } else if (activeTab === 'Upcoming') {
      return (
        <MatchList
          isMatchDataAvailable={isMatchDataAvailable}
          setIsMatchDataAvailable={setIsMatchDataAvailable}
          activeTab={activeTab}
        />
      );
    } else if (activeTab === 'More') {
      return <More />;
    } else if (activeTab === 'Results') {
      return <Results />;
    } else if (activeTab === 'Standings') {
      return <Standings />;
    }
  };

  //check for match ongoing every minute in areact style
  const MINUTE_MS = 60000;

  useEffect(() => {
    setIsMatchOngoing(checkMatchOngoing());
    const interval = setInterval(() => {
      setIsMatchOngoing(checkMatchOngoing());
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <div className="app select-none">
      <header className="header">
        <p className="justify-items-center mr-3 text-gray-300 font-semibold">
          C KAN
        </p>
        <VLogo width="40" height="48" className="justify-items-center" />
        <p className="ml-3 text-gray-300 font-semibold"> ?</p>
        <Settings />
      </header>
      <TabMenu
        isOneStreamerOnline={isOneStreamerOnline}
        isMatchOngoing={isMatchOngoing}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <div className="overflow-auto h-[321px] rounded-b-[18px] scrollbar-none">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Popup;
