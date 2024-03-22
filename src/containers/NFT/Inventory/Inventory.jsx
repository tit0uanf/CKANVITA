import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Thumbnail from '../Thumbnail/Thumbnail';
import Preview from '../Preview/Preview';
import './Inventory.css';
import VLogo from '../../VLogo/VLogo';

const Inventory = ({
  onNFTTableLeave,
  onNFTTableEnter,
  mouseX,
  mouseY,
  twitter_handle,
  wallet,
}) => {
  const [NFTData, setNFTData] = useState([]);
  const [currentNFT, setCurrentNFT] = useState(null);
  const [isNFTDataEmpty, setIsNFTDataEmpty] = useState(false);

  const fetchNFTData = useCallback(async () => {
    const result = await fetch(
      `https://api.tzkt.io/v1/tokens/balances?account=${wallet}&token.contract.in=KT1G5ph5ybHBbAy2hEd5RbPTuGEQuWXMWsBB,KT1HVzCL4e4F4f4pRwxG9ye9oo85YB6t7cmd`
    );
    const fetchedNFTData = await result.json();
    if (result.ok) {
      setNFTData(fetchedNFTData);
    }
  }, [wallet]);

  const checkEmptyNFTData = useCallback((nftdata) => {
    if (nftdata.length === 0) {
      setIsNFTDataEmpty(true);
      return;
    }
    let hasNonZeroBalance = false;
    for (let i = 0; i < nftdata.length; i++) {
      if (nftdata[i].balance > 0) {
        hasNonZeroBalance = true;
        break;
      }
    }
    setIsNFTDataEmpty(!hasNonZeroBalance);
  }, []);

  useEffect(() => {
    fetchNFTData();
  }, [fetchNFTData]);

  useEffect(() => {
    checkEmptyNFTData(NFTData);
  }, [NFTData, checkEmptyNFTData]);

  const renderActiveNFT = useMemo(() => {
    const style = { top: `${mouseY - 15}px`, left: `${mouseX - 15}px` };
    return (
      <div className="kpxrDe">
        <div
          id="NFTTable"
          className="app"
          onMouseLeave={onNFTTableLeave}
          onMouseEnter={onNFTTableEnter}
          style={style}
        >
          <div className="enCdzF">
            <div className="sPoPq">
              <span
                className="crop-text"
                onClick={() => {
                  setCurrentNFT(null);
                }}
              >
                {twitter_handle}
              </span>
            </div>
            <div className="dAYfLk">
              <div className="lgvMJv">
                <div className="hlTWVb">
                  <div className="kdagP">
                    {isNFTDataEmpty ? (
                      <span className="center-content">
                        No Avatars or Wearables to display
                      </span>
                    ) : (
                      NFTData.map((nft) => (
                        <Thumbnail
                          key={nft.token.tokenId}
                          nft={nft}
                          currentNFT={currentNFT}
                          setCurrentNFT={setCurrentNFT}
                          isSelected={
                            currentNFT &&
                            currentNFT.token.tokenId === nft.token.tokenId
                          }
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {currentNFT ? (
            <Preview currentNFT={currentNFT} />
          ) : (
            <div className="kwVQZn">
              <VLogo height="96" width="86.4" color="#18181b" />
            </div>
          )}
        </div>
      </div>
    );
  }, [
    NFTData,
    currentNFT,
    isNFTDataEmpty,
    mouseX,
    mouseY,
    onNFTTableEnter,
    onNFTTableLeave,
    twitter_handle,
  ]);

  return renderActiveNFT;
};

export default React.memo(Inventory);
