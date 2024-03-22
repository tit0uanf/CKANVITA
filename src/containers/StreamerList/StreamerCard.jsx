import React from 'react';
import qmark from '../../assets/img/qmark.png';

const StreamerCard = ({ streamer }) => {
  return (
    <article className="rounded-[18px] mt-1 relative h-[103px]">
      <div className="rounded-[18px] py-4 px-2 bg-gray-900 flex items-center">
        <img 
          className="rounded-xl h-12 w-12 mr-2" 
          src={`${streamer.profile_img_url}`}
          alt="Streamer"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = qmark;
          }}
        />
        <div className="flex-grow">
          <a
            href={`https://www.twitch.tv/${streamer.twitch}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="absolute top-0 right-0 w-12 py-[13px] px-[13px] h-1/2 rounded-[9px] bg-indigo-700 hover:bg-indigo-800 justify-center item-center">
             <svg
              width="25px"
              height="25px"
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
            </div>
          </a>
          <a
            href={`https://www.twitter.com/${streamer.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="absolute bottom-0 right-0 w-12 py-[15px] px-[14px] h-1/2 rounded-[9px] bg-gray-500 hover:bg-slate-600">
             <svg
              width="25px"
              height="25px"
              viewBox="0 0 256 256"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <g>
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
                />
              </g>
            </svg>
            </div>
          </a>
          <span className="text-lg font-medium text-gray-200">
            {streamer.real_name}
          </span>
          <div className="text-gray-400 truncate max-w-[310px]">
            <span className="text-gray-200 font-normal">
              {streamer.game_name} -{' '}
            </span>
            {streamer.title}
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            <span className="flex whitespace-nowrap rounded-full px-2.5 text-xs bg-gray-800 text-gray-300">
              <span className="mt-[2px]">{streamer.viewer_count}</span>
             <svg width="20px" height="20px" fill="#fae100" margin=" auto">
              <g>
                <path
                  fillRule="evenodd"
                  d="M5 7a5 5 0 116.192 4.857A2 2 0 0013 13h1a3 3 0 013 3v2h-2v-2a1 1 0 00-1-1h-1a3.99 3.99 0 01-3-1.354A3.99 3.99 0 017 15H6a1 1 0 00-1 1v2H3v-2a3 3 0 013-3h1a2 2 0 001.808-1.143A5.002 5.002 0 015 7zm5 3a3 3 0 110-6 3 3 0 010 6z"
                  clipRule="evenodd"
                ></path>
              </g>
            </svg>
            </span>
            <span className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs bg-gray-800 text-gray-300">
              {streamer.role}
            </span>
            {
              // If streamer.game is not empty, show the game tag
              streamer.game && (
                <span className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs bg-gray-800 text-gray-300">
                  {streamer.game}
                </span>
              )
            }
          </div>
        </div>
      </div>
    </article>
  );
};

export default StreamerCard;