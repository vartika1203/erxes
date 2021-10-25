import Box from 'modules/common/components/Box';
import DataWithLoader from 'modules/common/components/DataWithLoader';
import { __ } from 'modules/common/utils';
import { SidebarList } from 'modules/layout/styles';
import React from 'react';

function StatusFilter() {
  const data = <SidebarList></SidebarList>;

  return (
    <Box title={__('Filter by status')} name="showFilterByStatus">
      <DataWithLoader
        data={data}
        loading={false}
        count={2}
        emptyIcon="leaf"
        size="small"
        objective={true}
      />
    </Box>
  );
}

export default StatusFilter;
