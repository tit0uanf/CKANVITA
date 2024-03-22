import React from 'react';
import DropMenu from '../DropMenu/DropMenu';
import StandingsTable from './StandingsTable';

const Standings = () => {

  return (
    <div class="pr-1 pl-1  w-3/3 overflow-auto cursor-pointer">
      <div class="   ">
        <DropMenu ContentComponent={<StandingsTable game="lec" />} game="lec" />
        <DropMenu ContentComponent={<StandingsTable game="lfl" />} game="lfl" />
        <DropMenu ContentComponent={<StandingsTable game="vct" />} game="vct" />
      </div>
    </div>
  );
};

export default Standings;
