import Wrapper from 'modules/layout/components/Wrapper';
import React from 'react';
import StatusFilter from './filters/StatusFilter';

function Sidebar() {
  return (
    <Wrapper.Sidebar>
      <StatusFilter />
    </Wrapper.Sidebar>
  );
}

export default Sidebar;
