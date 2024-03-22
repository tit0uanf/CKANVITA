import React from 'react';
import Vlogo from '../../assets/img/vlogo_black_yellow.png';
import qmark from '../../assets/img/qmark.png';

import {
  printDaysOrHoursMinutes,
  dateDisplay,
  hoursDisplay,
} from '../../pages/Background/time_handler';

const MatchCard = ({ match }) => {
  let score_border = 'score bg-slate-800 w-96';
  if (match.status === 'live') {
    score_border = 'score bg-slate-800 border-2 border-rose-500 w-96';
  }

  const isImgSrcValid = (imgSrc) => {
    if (imgSrc === null) {
      return qmark;
    } else {
      if (imgSrc.includes('Vitality')) {
        return Vlogo;
      }
      return imgSrc;
    }
  };

  const scoreOrDate = (match) => {
    if (match.status === 'live') {
      return (
        <div className="mx-3 my-2 text-lg w-18 text-center">
          {match.team_1_score} : {match.team_2_score}
        </div>
      );
    } else if (match.status === 'upcoming') {
      return (
        <div className="mx-3 my-2  w-29 ">
          <p className="text-gray-300 text-center">
            {dateDisplay(match.date)} - {hoursDisplay(match.date)}
          </p>
          <p className="text-gray-500 text-center">
            {printDaysOrHoursMinutes(match.date)}
          </p>
        </div>
      );
    } else if (match.status === 'finished') {
      return (
        <div className="mx-3 my-2  w-28 text-center">
          {match.team_1_score} : {match.team_2_score}
          <p className="text-gray-500">Finished</p>
        </div>
      );
    }
  };

  const displayStreamIfMatchLive = (match) => {
    if (match.status === 'live') {
      return (
        <a href={match.stream} target="_blank" rel="noreferrer">
          <div className="flex justify-between ">
            <span className="flex rounded-full px-3 text-lg pt-0.5 pb-0.5 bg-gray-600 hover:bg-gray-400">
              <svg
                className="mr-2 mt-1"
                width="20px"
                height="20px"
                viewBox="0 0 256 256"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <g>
                  <path
                    d="M17.4579119,0 L0,46.5559188 L0,232.757287 L63.9826001,232.757287 L63.9826001,267.690956 L98.9144853,267.690956 L133.811571,232.757287 L186.171922,232.757287 L256,162.954193 L256,0 L17.4579119,0 Z M40.7166868,23.2632364 L232.73141,23.2632364 L232.73141,151.29179 L191.992415,192.033461 L128,192.033461 L93.11273,226.918947 L93.11273,192.033461 L40.7166868,192.033461 L40.7166868,23.2632364 Z M104.724985,139.668381 L127.999822,139.668381 L127.999822,69.843872 L104.724985,69.843872 L104.724985,139.668381 Z M168.721862,139.668381 L191.992237,139.668381 L191.992237,69.843872 L168.721862,69.843872 L168.721862,139.668381 Z"
                    fill="white"
                  ></path>
                </g>
              </svg>
              <h3 className="text-lg font-medium  text-gray-300">
                {match.team_1.includes('Team Vitality') ||
                match.team_1.includes('Vitality.Bee') ||
                match.team_1.includes('LOSC')
                  ? match.team_2
                  : match.team_1}
              </h3>
            </span>
          </div>
        </a>
      );
    } else {
      return (
        <h3 className="text-lg font-medium  text-gray-300">
          {'⚔️ '}
          {match.team_1.includes('Team Vitality') ||
          match.team_1.includes('Vitality.Bee') ||
          match.team_1.includes('LOSC')
            ? match.team_2
            : match.team_1}
        </h3>
      );
    }
  };

  return (
    <article
      key={match.date + match.game + match.team_1 + match.team_2}
      className="rounded-[18px] mt-1"
    >
      <div className="rounded-[18px] px-4 py-3 bg-gray-900 flex flex-col items-center">
        <div className={score_border}>
          <img
            src={isImgSrcValid(match.team_1_img)}
            alt="team logo"
            className="team-logo"
          />
          {scoreOrDate(match)}
          <img
            src={isImgSrcValid(match.team_2_img)}
            alt="team logo"
            className="team-logo"
          />
        </div>

        {/* Main content below score */}
        <div className="mt-2 flex w-full items-center">
          {/* Event image on the left */}
          <div className="mr-4 mt-1 flex-shrink-0">
            <img
              src={isImgSrcValid(match.event_img)}
              alt="Event"
              className="w-12 h-12 object-cover rounded-xl"
            />
          </div>

          {/* Match details */}
          <div className="flex-grow flex flex-col">
            <a href="/#">
              <div className="flex">{displayStreamIfMatchLive(match)}</div>
              <h2 className="text-gray-400">{match.event} </h2>
            </a>
            <div className="mt-1 flex flex-wrap gap-1">
              <span className="whitespace-nowrap rounded-full px-2.5 text-xs bg-gray-800 text-gray-300">
                {match.game}
              </span>
              <span className="whitespace-nowrap rounded-full px-2.5 text-xs bg-gray-800 text-gray-300">
                BO{match.bo === 0 ? '?' : match.bo}
              </span>
              <span className="whitespace-nowrap rounded-full px-2.5 text-xs bg-gray-800 text-gray-300">
                {match.stage}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MatchCard;
