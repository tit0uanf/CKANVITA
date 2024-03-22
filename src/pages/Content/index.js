import React from 'react';
import { createRoot } from 'react-dom/client';
import Icon from '../../containers/NFT/Icon/Icon';
const EXPECTED_WIDTH = 440;
const EXPECTED_HEIGHT = 300;

const getTwitterWallet = async (twitterHandle) => {
  try {
    const response = await fetch(
      'https://ckanvita.up.railway.app/api/checkTwitter',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ twitter_handle: twitterHandle }),
      }
    );

    const data = await response.json();
    if (data.exists && data.wallet) {
      return data.wallet;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const likeAndRetweet = (node) => {
  const likeToClick = node.querySelector('[data-testid="like"]');
  if (likeToClick) {
    likeToClick.click();
    console.log('Liked Vitality tweet');
  }
  const retweetToClick = node.querySelector('[data-testid="retweet"]');
  if (retweetToClick) {
    retweetToClick.click();
    console.log('Retweet Vitality tweet');
  }
};

const getAdjustedPosition = (el, expectedWidth, expectedHeight) => {
  const rect = el.getBoundingClientRect();
  let top = rect.top + window.scrollY;
  let left = rect.left + window.scrollX;

  // Check if the component will render outside the right edge of the viewport
  if (left + expectedWidth > window.innerWidth + window.scrollX) {
    left = window.innerWidth + window.scrollX - expectedWidth;
  }

  // Check if the component will render outside the bottom edge of the viewport
  if (top + expectedHeight > window.innerHeight + window.scrollY) {
    top = window.innerHeight + window.scrollY - expectedHeight;
  }

  return { top, left };
};

// Then, when you're calculating the position:

let iconComponentMounted = [];

const handleNodeMutation = async (node) => {
  if (
    node.nodeType === Node.ELEMENT_NODE &&
    !node.classList.contains('extension-added')
  ) {
    const confirmRetweetToClick = node.querySelector(
      '[data-testid="retweetConfirm"]'
    );
    if (confirmRetweetToClick) {
      confirmRetweetToClick.click();
      console.log('confirmRetweet Vitality tweet');
    }
    const userNameDiv = node.querySelector('div[data-testid="User-Name"]');
    if (!userNameDiv) return;
    // Then, search within this parent for the first span element
    const outerSpan = userNameDiv.querySelector('span');
    if (!outerSpan) return;
    // Within the first span, search for the first nested span element
    const innerSpan = outerSpan.querySelector('span');
    if (!innerSpan) return;
    // Extract and output the text content
    const twitter_handle = innerSpan ? innerSpan.textContent : 'wtf';

    let existsInDB = null;
    if (twitter_handle !== 'wtf') {
      if (twitter_handle.includes('Team Vitality')) {
        likeAndRetweet(node);
      }
      existsInDB = await getTwitterWallet(twitter_handle);
    } else {
      return;
    }

    const wallet = existsInDB;
    if (
      existsInDB &&
      userNameDiv &&
      !userNameDiv.querySelector('.extension-added')
    ) {
      const mountPoint = document.createElement('span');
      mountPoint.classList.add('extension-added');
      const firstDivInUsername = userNameDiv
        .querySelector('div')
        .querySelector('div')
        .querySelector('div');
      firstDivInUsername.appendChild(mountPoint);

      const root = createRoot(mountPoint);
      const position = getAdjustedPosition(
        mountPoint,
        EXPECTED_WIDTH,
        EXPECTED_HEIGHT
      );

      iconComponentMounted.push({
        root,
        position,
        handle: existsInDB,
        wallet: wallet,
      });

      root.render(
        <Icon
          twitter_handle={existsInDB}
          wallet={wallet}
          top={position.top}
          left={position.left}
          onUnmount={() => {
            const index = iconComponentMounted.findIndex(
              (component) => component.root === root
            );
            if (index !== -1) {
              iconComponentMounted.splice(index, 1);
            }
          }}
        />
      );
    }
  }
};

const handleMutation = async (mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length) {
      for (let node of mutation.addedNodes) {
        await handleNodeMutation(node);
      }
    }
  }
};

//get overlayEnabled from local storage, if ON then run the code
//check if https://ckanvita.up.railway.app/api/checkTwitter is up
//if up, then run the code
//if not up, then return

chrome.storage.local.get(['overlayEnabled'], function (result) {
  if (result.overlayEnabled === 'ON') {
    console.log('Overlay ON !');
    const observer = new MutationObserver((mutationsList) => {
      handleMutation(mutationsList); // Call the async function here
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
  } else {
    console.log('Overlay OFF !');
    return;
  }
});
