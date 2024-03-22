import React, { useRef, useEffect, useState } from 'react';
import '../../pages/Popup/Popup.css';
import './SettingsMenu.css';

const SettingsMenu = (props) => {
  const ref = useRef(null);
  const { setIsSettingsActive } = props;

  const [overlayEnabled, setOverlayEnabled] = useState(false);

  const overlayStatus = () => {
    chrome.storage.local.get('overlayEnabled').then((object) => {
      if (typeof object.overlayEnabled === 'undefined') {
        chrome.storage.local.set({ overlayEnabled: 'OFF' }).then(() => {
          console.log('Creating in storage : overlay OFF ');
        });
        setOverlayEnabled(false);
      } else {
        setOverlayEnabled(object.overlayEnabled === 'ON');
      }
    });
  };

  useEffect(() => {
    overlayStatus();
  }, []);

  const handleToggleOverlay = () => {
    if (overlayEnabled) {
      setOverlayEnabled(false);
      chrome.storage.local.set({ overlayEnabled: 'OFF' }).then(() => {
        console.log('Browser storage : overlay OFF');
      });
    } else {
      setOverlayEnabled(true);
      chrome.storage.local.set({ overlayEnabled: 'ON' }).then(() => {
        console.log('Browser storage : overlay ON');
      });
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsSettingsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className="mt-5 mr-7 origin-top-right border-gray-300 rounded-md bg-gray-700 p-1"
    >
      <div className="flex flex-row p-1 justify-between">
        <div className="flex items-center text-gray-200 font-normal pr-2">
          Overlay
        </div>

        <div className="flex items-center">
          <label
            htmlFor="toggleBOverlay"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                onChange={handleToggleOverlay}
                checked={overlayEnabled}
                type="checkbox"
                id="toggleBOverlay"
                className="sr-only"
              ></input>
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                  overlayEnabled ? 'translate-x-12' : ''
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
