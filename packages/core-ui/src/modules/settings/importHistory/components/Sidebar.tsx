import { __ } from 'modules/common/utils';
import LeftSidebar from 'modules/layout/components/Sidebar';
import { SidebarList as List } from 'modules/layout/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@erxes/ui/src/components/Box';
import { HeaderItems } from '@erxes/ui/src/layout/styles';
import Icon from '@erxes/ui/src/components/Icon';

const ITEM_TYPES = {
  CUSTOMER: 'customer',
  COMPANY: 'company',
  PRODUCT: 'product',
  BRAND: 'brand',
  CHANNEL: 'channel',
  DEAL: 'deal',
  PERMISSION: 'permission',
  TASK: 'task',
  TICKET: 'ticket',
  TEAM_MEMBER: 'user',
  LEAD: 'lead'
};

type Props = {
  currentType: string;
  title: string;
};

class Sidebar extends React.Component<Props> {

  renderListItem(type: string, text: string) {
    const className = this.props.currentType === type ? 'active' : '';

    return (
      <li>
        <Link to={`?type=${type}`} className={className}>
          {__(text)}
          <HeaderItems rightAligned={true}>{this.props.currentType === type ? <Icon icon="angle-right"/> : null}</HeaderItems>
        </Link>
      </li>
    );
  }

  render() {
    const { title } = this.props;
    return (
      <LeftSidebar full={true}>
        <Box title={__(title)} isOpen={true} boldText={true} name="import collapsible">
        <LeftSidebar.Section>
          <List id={'ImportExportSidebar'}>
            {this.renderListItem(ITEM_TYPES.BRAND, 'Brands')}
            {this.renderListItem(ITEM_TYPES.CHANNEL, 'Channels')}
            {this.renderListItem(ITEM_TYPES.LEAD, 'Leads')}
            {this.renderListItem(ITEM_TYPES.CUSTOMER, 'Customers')}
            {this.renderListItem(ITEM_TYPES.COMPANY, 'Companies')}
            {this.renderListItem(ITEM_TYPES.PERMISSION, 'Permissions')}
            {this.renderListItem(ITEM_TYPES.PRODUCT, 'Product & Service')}
            {this.renderListItem(ITEM_TYPES.DEAL, 'Deals')}
            {this.renderListItem(ITEM_TYPES.TASK, 'Tasks')}
            {this.renderListItem(ITEM_TYPES.TICKET, 'Tickets')}
            {this.renderListItem(ITEM_TYPES.TEAM_MEMBER, 'Team members')}
          </List>
        </LeftSidebar.Section>
        </Box>
      </LeftSidebar>
    );
  }
}

export default Sidebar;
