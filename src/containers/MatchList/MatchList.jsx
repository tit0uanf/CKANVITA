import React, { useState, useEffect } from 'react';
import './MatchList.css';
import MatchCard from './MatchCard';
import Loading from '../Loading/Loading';
import Message from '../Message/Message';
import { fetchMatchesDataBackground } from '../../pages/Background/match.js';

const MatchList = (props) => {
  const [matchesData, setMatchesData] = useState();
  const { activeTab, isMatchDataAvailable, setIsMatchDataAvailable } = props;

  const fetchMatchesData = async () => {
    chrome.storage.local.get('matches').then(async ({ matches }) => {
      if (typeof matches === 'undefined') {
        console.log("Match data doesn't exists");
        var fetchedMatchesData = await fetchMatchesDataBackground();
        if (typeof fetchedMatchesData !== 'undefined') {
          setMatchesData(fetchedMatchesData.matches_list);
          checkIsMatchDataAvailable(fetchedMatchesData.matches_list);
        }
      } else {
        console.log('Match data exists');
        setMatchesData(matches.matches_list);
        checkIsMatchDataAvailable(matches.matches_list);
      }
    });
  };

  const checkIsMatchDataAvailable = (matchesList) => {
    matchesList.length === 0
      ? setIsMatchDataAvailable(false)
      : setIsMatchDataAvailable(true);
  };

  useEffect(() => {
    fetchMatchesData();
  });

  return matchesData ? (
    isMatchDataAvailable ? (
      <div className="mt-1">
        {matchesData.map((match) => (
          <MatchCard
            match={match}
            key={match.date + match.game + match.team_1 + match.team_2}
          />
        ))}
      </div>
    ) : (
      <Message activeTab={activeTab} />
    )
  ) : (
    <Loading />
  );
};

export default MatchList;
