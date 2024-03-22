import React, { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import Message from '../Message/Message';
import { fetchStandingsDataBackground } from '../../pages/Background/match';
import qmark from '../../assets/img/qmark.png';

const StandingsTable = ({ game }) => {
  const [standingsData, setStandingsData] = useState(null);
  const [isStandingsDataAvailable, setIsStandingsDataAvailable] = useState(false);

  const PO_RANK_COLORS = {
    lec: { POHigh: 4, POLow: 8},
    lfl: { POHigh: 4, POLow: 6},
    vct: { POHigh: 4, POLow: 6},
  };

  const changeColorOnRank = (rank) => {
    const poRankColor = PO_RANK_COLORS[game];

    if (rank === 1) {
      return `table-text font-medium whitespace-nowrap text-[#FFD700]`;
    }
    else if (rank === 2) {
      return `table-text font-medium whitespace-nowrap text-gray-300`;
    }
    else if (rank === 3) {
      return `table-text font-medium whitespace-nowrap text-[#D2691E]`;
    }
    if (rank >= poRankColor.POHigh && rank <= poRankColor.POLow) {
      return "table-text font-medium whitespace-nowrap text-gray-400";
    }
    return "table-text font-medium whitespace-nowrap text-red-600";
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStandingsData = await fetchStandingsDataBackground(game);
      setStandingsData(fetchedStandingsData);
      setIsStandingsDataAvailable(!!fetchedStandingsData.length);
    };

    fetchData();
  }, [game]);

  return (
    <>
      {isStandingsDataAvailable ? (
        <div className="overflow-auto">
          <table className="table-auto w-full text-sm text-left text-gray-400 ">
            <thead className=" h-5 text-xs uppercase bg-gray-500 text-gray-300 ">
              <tr>
                <th scope="col" className="pl-2">
                  Team
                </th>
                <th scope="col" className=" ">Win</th>
                <th scope="col" className="pr-5 ">Loss</th>
              </tr>
            </thead>
            <tbody>
              {standingsData &&
                standingsData.map((standing) => (
                  <tr
                    key={standing.slug}
                    className="border-b bg-gray-700 border-gray-500 hover:bg-gray-600"
                  >
                    <th
                      key={standing.slug}
                      scope="row"
                      className={`${changeColorOnRank(standing.rank)}`}
                    >
                      <img
                        src={standing.image}
                        className="inline-block mr-1"
                        alt={standing.name}
                        height="20px"
                        width="20px"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = qmark;
                        }}
                      />
                      {standing.rank}. {standing.name}
                    </th>
                    <td className="pl-2">{standing.wins}</td>
                    <td className="pl-3">{standing.losses}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Message />
      )}
      {!standingsData && <Loading />}
    </>
  );


};

export default StandingsTable;