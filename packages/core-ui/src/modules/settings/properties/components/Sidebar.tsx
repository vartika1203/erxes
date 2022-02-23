import { __ } from 'modules/common/utils';
import LeftSidebar from 'modules/layout/components/Sidebar';
import { SidebarList as List } from 'modules/layout/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPropertiesGroups } from '../constants';
import { SidebarList } from '@erxes/ui-settings/src/styles';
import Box from '@erxes/ui/src/components/Box';

type Props = {
  currentType: string;
};

class Sidebar extends React.Component<Props> {
  renderListItem(group: string, type: string, text: string) {
    const className = this.props.currentType === type ? 'active' : '';

    return (
      <li key={`${group}_${type}`}>
        <Link to={`?type=${type}`} className={className}>
          {__(text)}
        </Link>
      </li>
    );
  }

  renderSideBar() {
    return getPropertiesGroups().map(group => (
      <SidebarList key={group.value}>
        <Box
          title={group.value}
          name="properties collapsible"
          isOpen={true}
        >
        <List key={`list_${group.value}`}>
          {group.types.map(type => {
            return this.renderListItem(group.value, type.value, type.label);
          })}
        </List>
        </Box>
      </SidebarList>
    ));
  }

  render() {
    return (
      <LeftSidebar full={true}>
        {this.renderSideBar()}
      </LeftSidebar>
    );
  }
}

export default Sidebar;
