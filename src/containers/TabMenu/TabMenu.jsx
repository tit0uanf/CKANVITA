import React, { useState, useEffect } from 'react';
import Ping from '../Ping/Ping';

const TabMenu = (props) => {
  const { setActiveTab, activeTab, isMatchOngoing } = props;
  const [pingOn, setPingOn] = useState(isMatchOngoing);
  const activeTabClass =
    'bg-gray-500 inline-block rounded-t-lg py-2 px-4 text-grey-700 hover:bg-gray-400 font-semibold border-b border-gray-700';
  const inactiveTabClass =
    'bg-gray-700 rounded-t-lg inline-block py-2 px-4 text-grey-400 hover:bg-gray-500 font-semibold';

  useEffect(() => {
    setPingOn(isMatchOngoing);
  }, [isMatchOngoing]);

  return (
    <ul className="flex border-b border-gray-600 ">
      <li
        id="TwitchTab"
        onClick={() => {
          if (activeTab !== 'TwitchTab') {
            setActiveTab('TwitchTab');
          }
        }}
        className="-mb-px ml-1"
      >
        <button
          className={`${
            activeTab === 'TwitchTab' ? activeTabClass : inactiveTabClass
          }`}
        >
          Twitch
        </button>
      </li>
      <li
        id="Upcoming"
        onClick={(event) => {
          if (activeTab !== 'Upcoming') {
            setActiveTab('Upcoming');
          }
        }}
        className="-mb-px ml-1"
      >
        {pingOn ? <Ping tab="Upcoming" /> : <> </>}
        <button
          className={`${
            activeTab === 'Upcoming' ? activeTabClass : inactiveTabClass
          }`}
        >
          Upcoming
        </button>
      </li>
      <li
        id="Results"
        onClick={(event) => {
          if (activeTab !== 'Results') {
            setActiveTab('Results');
          }
        }}
        className="-mb-px ml-1"
      >
        <button
          className={`${
            activeTab === 'Results' ? activeTabClass : inactiveTabClass
          }`}
        >
          Results
        </button>
      </li>
      <li
        id="Standings"
        onClick={(event) => {
          if (activeTab !== 'Standings') {
            setActiveTab('Standings');
          }
        }}
        className="-mb-px ml-1"
      >
        <button
          className={`${
            activeTab === 'Standings' ? activeTabClass : inactiveTabClass
          }`}
        >
          Standings
        </button>
      </li>
      <li
        id="More"
        onClick={(event) => {
          if (activeTab !== 'More') {
            setActiveTab('More');
          }
        }}
        className="-mb-px ml-6"
      >
        <button
          className={`${
            activeTab === 'More' ? activeTabClass : inactiveTabClass
          }`}
        >
          Overlay
        </button>
      </li>
    </ul>
  );
};

export default TabMenu;
