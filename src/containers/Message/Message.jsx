import React from 'react';
import '../../pages/Popup/Popup.css';
const Message = (props) => {
  const { activeTab } = props;

  const displayedMessage = () => {
    if (activeTab === 'TwitchTab') {
      return 'No Vitality players online';
    } else if (activeTab === 'Upcoming') {
      return 'No scheduled match';
    } else if (activeTab === 'Results') {
      return 'No results available';
    }
  };

  return (
    <div className=" flex items-center justify-center h-5/6 text-sm text-center md:text-base">
      <div>
        <p>{displayedMessage()}</p>
      </div>
    </div>
  );
};

export default Message;
