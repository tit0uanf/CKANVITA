import React from 'react';

function VLogo({width, height, color = "grey"}) {
  const style = {
    width: `${width}px`,
    height: `${height}px`
  };
  
  return (
    <>
      <svg style={style} viewBox="0 0 40 48">
        <g id="Symbols" stroke="none" strokeWidth="1" fillRule="evenodd">
          <g
            transform="translate(-96.000000, -13.000000)"
            fill={color}
            className="hover:fill-[#fae100]"
            fillRule="nonzero"
          >
            <g transform="translate(96.000000, 13.000000)">
              <path
                d="M9.05107399,30.5671642 L13.9633128,21.8197015 L6.31674564,0 C1.89644713,1.19402985 -2.42355287,10.2089552 1.59555161,17.7886567 C3.52749191,21.4280597 9.05107399,30.5671642 9.05107399,30.5671642 Z"
                id="Path"
              ></path>
              <polygon points="5.72928295 28.2626866 3.59435758 26.8513433 2.27614862 23.3432836 1.3233128 23.3432836 1.79853668 27.959403 7.61346205 31.4173134"></polygon>
              <polygon points="35.9000292 26.8513433 33.7651038 28.2626866 31.8809247 31.4173134 37.6934621 27.959403 38.171074 23.3432836 37.2158501 23.3432836"></polygon>
              <polygon points="12.9531635 36.4083582 19.7448053 48 26.4648053 36.4250746 19.7448053 37.4853731"></polygon>
              <polygon points="23.8140591 22.1038806 19.7471934 15.7922388 15.6803277 22.1038806 19.7471934 28.3343284"></polygon>
              <polygon points="29.28988 31.9044776 24.7262979 23.8304478 19.7471934 31.3122388 14.7680889 23.8304478 10.2045068 31.9044776 6.83495459 34.08 6.35734265 41.4161194 7.31256653 41.4161194 8.62838743 35.1880597 10.4313725 34.4453731 19.7471934 35.7277612 29.0630143 34.4453731 30.8659994 35.1880597 32.1818203 41.4161194 33.1370441 41.4161194 32.6594322 34.08"></polygon>
              <path d="M37.8964471,17.7886567 C41.9179397,10.2089552 37.5979397,1.19402985 33.1776412,0 L25.5358501,21.8197015 L30.4409247,30.5671642 C30.4409247,30.5671642 35.9668949,21.4280597 37.8964471,17.7886567 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    </>
  );
}

export default VLogo;