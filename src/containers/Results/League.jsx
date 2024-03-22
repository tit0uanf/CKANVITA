import React, { useState, useEffect } from 'react';
import './League.css';
import Message from '../Message/Message';
import qmark from '../../assets/img/qmark.png';
import { dateDisplay } from '../../pages/Background/time_handler';
import { fetchResultsDataBackground } from '../../pages/Background/match';

const League = (props) => {
  const { activeTab, game } = props;
  const [resultsData, setResultsData] = useState([]);
  const [isResultsDataAvailable, setIsResultsDataAvailable] = useState(false);

  const fetchResultsData = async (game) => {
    var fetchedResultsData = null;
    const results_string = 'results_' + game;
    chrome.storage.local.get(results_string).then(async (data) => {
      if (typeof data[results_string] === 'undefined') {
        console.log(results_string + " data doesn't exist");
        fetchedResultsData = await fetchResultsDataBackground(game);
        if (typeof fetchedResultsData !== 'undefined') {
          setResultsData(fetchedResultsData);
          checkIsResultsDataAvailable(fetchedResultsData);
        }
      } else {
        console.log('Results data exists');
        fetchedResultsData = data[results_string];
        setResultsData(fetchedResultsData);
        checkIsResultsDataAvailable(fetchedResultsData);
      }
    });
  };

  const checkIsResultsDataAvailable = (results) => {
    results.length === 0
      ? setIsResultsDataAvailable(false)
      : setIsResultsDataAvailable(true);
  };

  const getWinnerNameAndScore = (result) => {
    let opponentName = '';
    let opponentScore = '';
    let vitalityScore = '';
    let opponentLogo = qmark;
    if (result.firstTeamName.includes('Vitality')) {
      opponentName = result.secondTeamName;
      opponentScore = result.secondTeamScore;
      vitalityScore = result.firstTeamScore;
      opponentLogo = result.secondTeamImageUrl;
    } else {
      opponentName = result.firstTeamName;
      opponentScore = result.firstTeamScore;
      vitalityScore = result.secondTeamScore;
      opponentLogo = result.firstTeamImageUrl;
    }
    return { opponentName, opponentScore, vitalityScore, opponentLogo };
  };

  const computeOpponentCell = (result) => {
    let { opponentName, opponentScore, vitalityScore, opponentLogo } =
      getWinnerNameAndScore(result);
    let cssCell = '';
    if (opponentScore < vitalityScore) {
      cssCell = 'table-text font-medium  whitespace-nowrap text-green-300';
    } else if (opponentScore > vitalityScore) {
      cssCell = 'table-text font-medium  whitespace-nowrap text-red-300';
    }
    return (
      <div className="flex items-center">
        <img
          src={isImgSrcValid(opponentLogo)}
          className="ml-2"
          alt={opponentName}
          height="40px"
          width="40px"
        />
        <span key={result.firstTeamName} className={cssCell}>
          {opponentName} ({opponentScore} - {vitalityScore})
        </span>
      </div>
    );
  };

  const isImgSrcValid = (imgSrc) => {
    if (imgSrc === null) {
      return qmark;
    } else {
      return imgSrc;
    }
  };

  useEffect(() => {
    fetchResultsData(game);
  });

  return resultsData ? (
    isResultsDataAvailable ? (
      <a href="/#" className="cursor-default">
        <div className="overflow-auto mb-1">
          <table className="table-auto w-full text-sm text-left text-gray-400">
            {resultsData.map((result) => {
              return (
                <div key={result.id} className="rounded-[18px]  mb-1  ">
                  <div className="rounded-[18px] p-2  bg-gray-900  ">
                    {computeOpponentCell(result)}
                    <h2 className="text-gray-400 mt-1 ml-2 ">
                      {result.eventTitle}{' '}
                    </h2>

                    <div className="mt-1 flex flex-wrap gap-1 ml-2">
                      <span className="whitespace-nowrap rounded-full px-2.5  text-xs  bg-gray-500 text-gray-900">
                        {dateDisplay(result.dateStart)}
                      </span>

                      <span className="whitespace-nowrap rounded-full px-2.5  text-xs  bg-gray-800 text-gray-300">
                        BO{result.bestOf}
                      </span>

                      <span className="whitespace-nowrap rounded-full px-2.5  text-xs bg-gray-800  text-gray-300">
                        {result.title}
                      </span>

                      <span className="whitespace-nowrap rounded-full px-2.5  text-xs  bg-gray-800 text-gray-300">
                        {result.stageName}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </table>
        </div>
      </a>
    ) : (
      <Message activeTab={activeTab} />
    )
  ) : (
    <></>
  );
};

export default League;
