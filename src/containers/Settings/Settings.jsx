import React, { useState, startTransition } from 'react';
import '../../pages/Popup/Popup.css';
import SettingsMenu from './SettingsMenu';
const Settings = () => {
  const [isSettingsActive, setIsSettingsActive] = useState(false);

  const computeSettingsMenu = () => {
    if (isSettingsActive) {
      return <SettingsMenu setIsSettingsActive={setIsSettingsActive} />;
    }
  };

  return (
    <div className="fixed top-1 right-1">
      <button
        className="fixed top-1 right-1 block shrink-0 rounded-lg bg-grey-500 p-2.5 select-auto text-gray-400 shadow-sm transition-transform hover:rotate-90"
        onClick={(event) => {
          startTransition(() => {
            setIsSettingsActive(!isSettingsActive);
          });
          console.log(isSettingsActive);
        }}
      >
        <span className="sr-only">Settings</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 opacity-100 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
      {computeSettingsMenu()}
    </div>
  );
};

export default Settings;
