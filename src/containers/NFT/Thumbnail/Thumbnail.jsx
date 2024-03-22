import React from 'react';
import '../Inventory/Inventory.css';

// Inside NFTThumbnail
const Thumbnail = (props) => {
  const { nft, currentNFT, setCurrentNFT, isSelected } = props;

  const selectNFT = (clicked_nft) => {
    if (currentNFT === clicked_nft) {
      setCurrentNFT(null);
    } else {
      setCurrentNFT(clicked_nft);
    }
  };

  const wearablesOrAvatar = (nft) => {
    if (
      nft.token.contract.address === 'KT1G5ph5ybHBbAy2hEd5RbPTuGEQuWXMWsBB' ||
      nft.token.metadata.name.includes('V.Coin')
    ) {
      return nft.token.metadata.thumbnailUri;
    } else if (
      nft.token.contract.address === 'KT1HVzCL4e4F4f4pRwxG9ye9oo85YB6t7cmd'
    ) {
      return (
        'https://dressup.apps.avatarz.com/images/picker/' +
        nft.token.tokenId +
        '.png'
      );
    }
  };

  const getRarityReturnCSS = (nft) => {
    const rarity = nft.token.metadata.attributes.find(
      (attribute) => attribute.name === 'Rarity'
    )?.value;
    if (rarity === 'Common') {
      return 'rgb(255, 255, 255) 0%, rgb(244, 181, 19) 82%';
    } else if (rarity === 'Rare') {
      return 'rgb(255, 255, 255) 0%, rgb(82, 136, 214) 82%';
    } else if (rarity === 'Epic') {
      return 'rgb(255, 255, 255) 0%, rgb(186, 28, 148) 82%';
    } else if (rarity === 'Legendary') {
      return 'rgb(255, 255, 255) 0%, rgb(233, 115, 0) 82%';
    }
    return '';
  };

  const rarityStyle = getRarityReturnCSS(nft);
  const thumbnailClass = isSelected ? `thumbnail selected` : 'thumbnail';

  return (
    <div
      className={thumbnailClass}
      onClick={() => {
        selectNFT(nft);
      }}
    >
      <img
        style={{ background: `linear-gradient(${rarityStyle})` }}
        src={wearablesOrAvatar(nft)}
        alt="NFT"
      />
    </div>
  );
};

export default Thumbnail;
