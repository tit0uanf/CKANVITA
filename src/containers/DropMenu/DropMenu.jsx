import React from 'react';
import lec from '../../assets/img/lec.png';
import cs from '../../assets/img/cs.png';
import vct from '../../assets/img/vct.png';
import lfl from '../../assets/img/lfl.png';
import rl from '../../assets/img/rl.png';

const DropMenu = (props) => {
  const { game, ContentComponent } = props;

  const gameImg = (game) => {
    if (game === 'vct') {
      return vct;
    } else if (game === 'lec') {
      return lec;
    } else if (game === 'cs') {
      return cs;
    } else if (game === 'lfl') {
      return lfl;
    } else if (game === 'rl') {
      return rl;
    }
  };

  return (
    <div className="mt-1">
      <details className="group">
        <summary className="h-13 text-white bg-gray-700 rounded-[10px] hover:bg-gray-600 group-open:bg-gray-700 group-open:hover:bg-gray-600 group-open:rounded-b-none text-lg px-4 py-1.5 text-center flex justify-between items-center font-medium cursor-pointer">
          <img alt="game" src={gameImg(game)} className="h-[43px] w-[43px]" />
          <span className="uppercase"> {game}</span>
          <span className="transition  group-open:rotate-180">
            <svg
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </span>
        </summary>
        <div className="bg-gray-700  rounded-b-[10px] ">{ContentComponent}</div>
      </details>
    </div>
  );
};

export default DropMenu;
