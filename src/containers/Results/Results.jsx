import React from 'react';
import League from './League';
import DropMenu from '../DropMenu/DropMenu';

const Results = () => {

  return (
    <div class="pr-1 pl-1  w-3/3 cursor-pointer">
      <div class="   ">
        <DropMenu ContentComponent={<League game="lec" />} game="lec" />
        <DropMenu ContentComponent={<League game="lfl" />} game="lfl" />        
        <DropMenu ContentComponent={<League game="vct" />} game="vct" />
        <DropMenu ContentComponent={<League game="cs" />} game="cs" /> 
        <DropMenu ContentComponent={<League game="rl" />} game="rl" />

      </div>
    </div>
  );
};

export default Results;
