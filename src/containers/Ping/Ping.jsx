import React from 'react';

const Ping = (props) => {
  const { tab } = props;

  const classChangeOnSize = (tab) => {
    if (tab === 'TwitchTab') {
      return 'absolute ml-[59px] mt-1 flex h-2 w-2';
    } else if (tab === 'Upcoming') {
      return 'absolute ml-[80px] mt-1 flex h-2 w-2';
    }
  };

  return (
    <span className={classChangeOnSize(tab)}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
    </span>
  );
};

export default Ping;
