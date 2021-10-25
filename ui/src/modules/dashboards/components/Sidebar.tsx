import Wrapper from 'modules/layout/components/Wrapper';
import React from 'react';
import StatusFilter from './filters/StatusFilter';

// type Props = {
//   counts: AutomationsCount;
// };

function Sidebar() {
  return (
    <Wrapper.Sidebar>
      <StatusFilter />
    </Wrapper.Sidebar>
  );
}

export default Sidebar;
