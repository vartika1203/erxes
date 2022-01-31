// import Label from 'modules/common/components/Label';
import WithPermission from 'modules/common/components/WithPermission';
import { __, getEnv, setBadge, readFile } from 'modules/common/utils';
import { pluginNavigations, pluginsOfNavigations } from 'pluginUtils';
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LeftNavigation,
  NavIcon,
  Nav,
  SubNav,
  NavItem,
  SubNavItem,
  SmallLabel,
  NewStyle,
  MoreMenu,
  MoreSearch,
  StoreItem,
  MoreRecentAdd,
  MoreItemRecent,
  MoreItemRow,
  AllAddedPlugin,
  AllItemRow,
  Repostion,
  // GlobalProfile,
  MoreTitle
} from '../styles';
import Tip from 'modules/common/components/Tip';
import { getThemeItem } from 'utils';
import Icon from 'modules/common/components/Icon';
import FormControl from 'modules/common/components/form/Control';

// const { REACT_APP_DASHBOARD_URL } = getEnv();

export interface ISubNav {
  permission: string;
  link: string;
  value: string;
  icon: string;
  additional?: boolean;
}

type IProps = {
  unreadConversationsCount?: number;
  onCollapseNavigation: () => void;
};

type State = {
  showMenu: boolean;
  showGlobal: boolean;
  extraMenus: any[];
  recentlyAddedMenus: any[];
};

class Navigation extends React.Component<IProps, State> {
  private mainMenus: any[] = [];

  constructor(props) {
    super(props);

    const recentlyAddedMenus: any[] = [];
    const extraMenus: any[] = [];

    pluginNavigations().forEach((menu, index) => {
      if (index < 5) {
        this.mainMenus.push(menu);
      }
      if (index > 4 && index < 10) {
        recentlyAddedMenus.push(menu);
      } else {
        extraMenus.push(menu);
      }
    });

    this.state = {
      showMenu: false,
      showGlobal: false,
      extraMenus,
      recentlyAddedMenus
    };
  }

  componentWillReceiveProps(nextProps) {
    const unreadCount = nextProps.unreadConversationsCount;

    if (unreadCount !== this.props.unreadConversationsCount) {
      setBadge(unreadCount, __('Team Inbox').toString());
    }
  }

  getLink = url => {
    const storageValue = window.localStorage.getItem('pagination:perPage');

    let parsedStorageValue;

    try {
      parsedStorageValue = JSON.parse(storageValue || '');
    } catch {
      parsedStorageValue = {};
    }

    if (url.includes('?')) {
      const pathname = url.split('?')[0];

      if (!url.includes('perPage') && parsedStorageValue[pathname]) {
        return `${url}&perPage=${parsedStorageValue[pathname]}`;
      }
      return url;
    }

    if (parsedStorageValue[url]) {
      return `${url}?perPage=${parsedStorageValue[url]}`;
    }

    return url;
  };

  renderSubNavItem = (child, index: number) => {
    return (
      <WithPermission key={index} action={child.permission}>
        <SubNavItem additional={child.additional || false}>
          <NavLink to={this.getLink(child.link)}>
            <i className={child.icon} />
            {__(child.value)}
          </NavLink>
        </SubNavItem>
      </WithPermission>
    );
  };

  renderChildren(url: string, text: string, childrens?: ISubNav[]) {
    if (!childrens || childrens.length === 0) {
      return null;
    }

    return (
      <SubNav>
        {childrens.map((child, index) => this.renderSubNavItem(child, index))}
      </SubNav>
    );
  }

  renderNavItem = (
    permission: string,
    text: string,
    url: string,
    icon?: string,
    childrens?: ISubNav[],
    label?: React.ReactNode
  ) => {
    const item = (
      <NavItem>
        <NavLink to={this.getLink(url)}>
          <NavIcon className={icon} />
          <label>{__(text)}</label>
          {label}
        </NavLink>
        {this.renderChildren(url, text, childrens)}
      </NavItem>
    );

    if (!childrens || childrens.length === 0) {
      return (
        <WithPermission key={url} action={permission}>
          <Tip placement="right" key={Math.random()} text={__(text)}>
            {item}
          </Tip>
        </WithPermission>
      );
    }

    return (
      <WithPermission key={url} action={permission}>
        {item}
      </WithPermission>
    );
  };

  moreItem = () => {
    return (
      <MoreMenu visibility={this.state.showMenu}>
        <MoreSearch>
          <Icon icon="search-1" size={15} />
          <FormControl type="text" placeholder="find your use plugin" />
        </MoreSearch>
        <MoreRecentAdd>
          <MoreTitle>Resently added</MoreTitle>
          <MoreItemRow>
            {this.state.recentlyAddedMenus.map((menu, index) => (
              <MoreItemRecent order={index}>
                <NavLink to={this.getLink(menu.url)}>
                  <NavIcon className={menu.icon} />
                  <label>{__(menu.text)}</label>
                </NavLink>
                {this.renderChildren(menu.url, menu.text, menu.childrens)}
              </MoreItemRecent>
            ))}
          </MoreItemRow>
        </MoreRecentAdd>
        <AllAddedPlugin>
          <MoreTitle>All added plugin</MoreTitle>
          <AllItemRow>
            {this.state.extraMenus.map((menu, index) => (
              <MoreItemRecent order={index}>
                <NavLink to={this.getLink(menu.url)}>
                  <NavIcon className={menu.icon} />
                  <label>{__(menu.text)}</label>
                </NavLink>
              </MoreItemRecent>
            ))}
          </AllItemRow>
        </AllAddedPlugin>
      </MoreMenu>
    );
  };

  // globalProfile = () => {
  //   return (
  //     <GlobalProfile visibility={this.state.showGlobal}>
  //       <Icon icon='search-1' size={15} />
  //       <FormControl type='text' placeholder='find your use plugin' />
  //     </GlobalProfile>
  //   );
  // };

  render() {
    // const { unreadConversationsCount } = this.props;
    const { showMenu, showGlobal } = this.state;
    const logo = 'erxes-dark.png';
    const thLogo = getThemeItem('logo');

    // const unreadIndicator = unreadConversationsCount !== 0 && (
    //   <Label shake={true} lblStyle='danger' ignoreTrans={true}>
    //     {unreadConversationsCount}
    //   </Label>
    // );

    const lbl = <SmallLabel>Beta</SmallLabel>;
    const nsn = <NewStyle>New</NewStyle>;

    return (
      <LeftNavigation>
        <NavLink
          to="/nav"
          onClick={() => this.setState({ showGlobal: !showGlobal })}
        >
          <img
            src={thLogo ? readFile(thLogo) : `/images/${logo}`}
            alt="erxes"
          />
          {/* <NavIcon className='icon-apps' />
          {this.globalProfile()} */}
        </NavLink>

        <Nav id="navigation">
          {/* {pluginsSettingsNavigations().map(nav =>
            this.renderNavItem('', nav.text, nav.url, nav.icon)
          )} */}
          {pluginsOfNavigations(this.renderNavItem)}
          {this.mainMenus.map((nav, index) => (
            <NavItem key={index}>
              <NavLink to={this.getLink(nav.url)}>
                <NavIcon className={nav.icon} />
                <label>{__(nav.text)}</label>
              </NavLink>
              {this.renderChildren(nav.url, nav.text, nav.childrens)}
            </NavItem>
          ))}
          {this.renderNavItem(
            'showIntegrations',
            __('Settings'),
            '/settings',
            'icon-settings',
            [],
            nsn
          )}

          <Repostion>
            <NavLink
              to="more"
              onClick={() => this.setState({ showMenu: !showMenu })}
            >
              <NavIcon className="icon-ellipsis-h" />
              <label>{__('More')}</label>
            </NavLink>
            {this.moreItem()}
          </Repostion>

          <StoreItem>
            <NavLink to="/">
              <NavIcon className="icon-store" />
              <label>{__('Store')}</label>
            </NavLink>
          </StoreItem>

          {/* {this.renderNavItem('', nav.text, nav.url, nav.icon)} */
          /* {this.renderNavItem(
            'showConversations',
            __('Team Inbox'),
            '/inbox',
            'icon-chat',
            [
              {
                permission: 'showConversations',
                link: '/inbox',
                value: 'Conversations',
                icon: 'icon-comments'
              },
              {
                permission: 'showChannels',
                link: '/settings/channels',
                value: 'Channels',
                icon: 'icon-layer-group',
                additional: true
              },
              {
                permission: 'showIntegrations',
                link: '/settings/integrations',
                value: 'Integrations',
                icon: 'icon-puzzle-piece'
              },
              {
                permission: 'getSkills',
                link: '/settings/skills',
                value: 'Skills',
                icon: 'icon-file-info-alt'
              },
              {
                permission: 'showResponseTemplates',
                link: '/settings/response-templates',
                value: 'Responses',
                icon: 'icon-files-landscapes'
              }
            ],
            unreadIndicator
          )}
          {this.renderNavItem(
            'showCustomers',
            __('Contacts'),
            '/contacts/customer',
            'icon-users',
            [
              {
                permission: 'showCustomers',
                link: '/contacts/visitor',
                value: 'Visitors',
                icon: 'icon-user-square'
              },
              {
                permission: 'showCustomers',
                link: '/contacts/lead',
                value: 'Leads',
                icon: 'icon-file-alt'
              },
              {
                permission: 'showCustomers',
                link: '/contacts/customer',
                value: 'Customers',
                icon: 'icon-users-alt'
              },
              {
                permission: 'showCompanies',
                link: '/companies',
                value: 'Companies',
                icon: 'icon-building'
              },
              {
                permission: 'showUsers',
                link: '/settings/team',
                value: 'Team Members',
                icon: 'icon-puzzle-piece'
              },
              {
                permission: 'showSegments',
                link: '/segments/customer',
                value: 'Segments',
                icon: 'icon-chart-pie-alt',
                additional: true
              },
              {
                permission: 'showTags',
                link: '/tags/conversation',
                value: 'Tags',
                icon: 'icon-tag-alt'
              }
            ]
          )}
          {this.renderNavItem(
            'showForms',
            __('Marketing'),
            '/forms',
            'icon-head-1',
            [
              {
                permission: 'showForms',
                link: '/forms',
                value: 'Forms',
                icon: 'icon-laptop'
              },
              {
                permission: 'showEngagesMessages',
                link: '/campaigns',
                value: 'Campaigns',
                icon: 'icon-megaphone'
              },
              {
                permission: 'showGrowthHacks',
                link: '/growthHack',
                value: 'Growth Hacking',
                icon: 'icon-idea'
              }
            ]
          )}
          {this.renderNavItem(
            'showDeals',
            __('Sales'),
            '/deal',
            'icon-signal-alt-3',
            [
              {
                permission: 'showDeals',
                link: '/deal',
                value: 'Sales Pipeline',
                icon: 'icon-piggy-bank'
              },
              {
                permission: 'showProducts',
                link: '/settings/product-service',
                value: 'Products & Service',
                icon: 'icon-box'
              }
            ]
          )}
          {this.renderNavItem(
            'showKnowledgeBase',
            __('Support'),
            '/knowledgeBase',
            'icon-leaf',
            [
              {
                permission: 'showTickets',
                link: '/ticket/board',
                value: 'Tickets',
                icon: 'icon-ticket'
              },
              {
                permission: 'showKnowledgeBase',
                link: '/knowledgeBase',
                value: 'Knowledgebase',
                icon: 'icon-book-open'
              }
            ]
          )}
          {this.renderNavItem(
            'showConversations',
            __('Managament'),
            '/task',
            'icon-laptop',
            [
              {
                permission: 'showConversations',
                link: '/task',
                value: 'Task',
                icon: 'icon-file-check-alt'
              },
              REACT_APP_DASHBOARD_URL !== 'undefined'
                ? {
                    permission: 'showDashboards',
                    link: '/dashboard',
                    value: 'Reports',
                    icon: 'icon-dashboard'
                  }
                : ({} as ISubNav),
              {
                permission: 'showCalendars',
                link: '/calendar',
                value: 'Calendar',
                icon: 'icon-calendar-alt'
              }
            ]
          )}
          {this.renderNavItem(
            'showAutomations',
            __('Automations'),
            '/automations',
            'icon-circular',
            [],
            lbl
          )}
          {this.renderNavItem(
            'showIntegrations',
            __('Bookings'),
            '/bookings',
            'icon-paste',
            [],
            lbl
          )} */}
        </Nav>
      </LeftNavigation>
    );
  }
}

export default Navigation;
