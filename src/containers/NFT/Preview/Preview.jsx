import React, { useState } from 'react';
import RaribleButton from '../Rarible/RaribleButton';
import './Preview.css';

const Preview = (props) => {
  const { currentNFT } = props;
  const [hoveredId, setHoveredId] = useState(null); // Add this line

  const nftName = (nft) => {
    const name = currentNFT.token.metadata.name;
    const firstDash = name.indexOf('-');
    const index =
      name.charAt(firstDash + 1) === 's'
        ? name.indexOf('-', firstDash + 1)
        : firstDash;
    return name.substring(index + 1);
  };

  const attribute_value = (attr, id) => {
    const name = attr.name;
    const value = attr.value;

    let valueClass = 'value pointer ';

    if (name === 'Rarity' && value === 'Rare') {
      valueClass += 'rare ';
    } else if (name === 'Rarity' && value === 'Common') {
      valueClass += 'common ';
    } else if (name === 'Rarity' && value === 'Epic') {
      valueClass += 'epic ';
    } else if (name === 'Rarity' && value === 'Legendary') {
      valueClass += 'legendary ';
    }
    if (name === 'Drop date') {
      valueClass += 'drop_date ';
    }
    if (value === 'Digital Twin') {
      valueClass += 'digital_twin ';
    }
    return (
      <>
        <div className={valueClass}>
          <span
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {hoveredId === id ? (
              <span className="name_nft crop-text">{name}</span>
            ) : (
              <span className="crop-nft-value">{value}</span>
            )}
          </span>
        </div>
      </>
    );
  };

  return (
    <div className="kwVQZn">
      <div className="kWkykN">
        {currentNFT.balance === 1 ? '' : currentNFT.balance + 'x'}{' '}
        {nftName(currentNFT)}
      </div>
      <div className="nft_img_container">
        <div className="overlay-container">
          <img
            alt="displayuri"
            src={currentNFT.token.metadata.displayUri}
          ></img>
          <div className="overlay">
            <div className="centered-content">
              {currentNFT.token.metadata.attributes.map((attr, index) => {
                return attribute_value(attr, index); // Pass index as id
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bPPwmY">
        <RaribleButton currentNFT={currentNFT} />
      </div>
    </div>
  );
};

export default Preview;
