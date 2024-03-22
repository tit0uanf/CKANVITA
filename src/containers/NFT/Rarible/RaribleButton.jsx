import React from 'react';
import './RaribleButton.css';

const RaribleButton = (props) => {
  const { currentNFT } = props;

  const raribleLink = (nft) => {
    if (nft.token.contract.address === 'KT1G5ph5ybHBbAy2hEd5RbPTuGEQuWXMWsBB') {
      return 'https://objkt.com/tokens/v-hive-avatars/' + nft.token.tokenId;
    } else if (
      nft.token.contract.address === 'KT1HVzCL4e4F4f4pRwxG9ye9oo85YB6t7cmd'
    ) {
      return 'https://objkt.com/tokens/v-hive-wearables/' + nft.token.tokenId;
    }
  };

  return (
    <a href={raribleLink(currentNFT)} target="_blank" rel="noreferrer">
      <div className="rarible_button">View on Objkt</div>
    </a>
  );
};

export default RaribleButton;
