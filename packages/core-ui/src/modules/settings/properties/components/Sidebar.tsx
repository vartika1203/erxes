import { __ } from 'modules/common/utils';
import LeftSidebar from 'modules/layout/components/Sidebar';
import { SidebarList as List } from 'modules/layout/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPropertiesGroups } from '../constants';
import { SidebarList } from '@erxes/ui-settings/src/styles';
import Box from '@erxes/ui/src/components/Box';
import Icon from '@erxes/ui/src/components/Icon';
import { HeaderItems } from '@erxes/ui/src/layout/styles';

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
          <HeaderItems rightAligned={true}>{this.props.currentType === type ? <Icon icon="angle-right"/> : null}</HeaderItems>
        </Link>
      </li>
    );
  }

  renderSideBar(groop) {
    return getPropertiesGroups().map(group => (
      <SidebarList key={group.value}>
        <Box
          title={group.value}
          name="properties collapsible"
          isOpen={true}
          boldText={group.value === groop}
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
    let groop;
    console.log(this.props.currentType, "current")
    if(this.props.currentType === "customer" || "company" || "conversation" || "device"){
      groop="contact";
    };
    if(this.props.currentType === "deal"){
      groop="deal";
    };
    if(this.props.currentType === "product"){
      groop="deal";
    };
    if(this.props.currentType === "ticket"){
      groop="ticket";
    };
    if(this.props.currentType === "task"){
      groop="task";
    };
    if(this.props.currentType === "user"){
      groop="user";
    };
    console.log("groop,", groop)
    return (
      <LeftSidebar full={true}>
        {this.renderSideBar(groop)}
      </LeftSidebar>
    );
  }
}

export default Sidebar;
