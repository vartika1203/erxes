import Label from 'modules/common/components/Label';
import WithPermission from 'modules/common/components/WithPermission';
import { __, getEnv, setBadge, readFile } from 'modules/common/utils';
import { pluginNavigations, pluginsOfNavigations } from 'pluginUtils';
import React, { Children } from 'react';
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
  LoadMore,
  LoadMoreSearch,
  LoadMoreRecentAdd,
  LoadItem
} from '../styles';
import Tip from 'modules/common/components/Tip';
import Button from 'modules/common/components/Button';
import { getThemeItem } from 'utils';

const { REACT_APP_DASHBOARD_URL } = getEnv();

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
};

class Navigation extends React.Component<IProps, State> {
  private mainMenus: any[] = [];
  private extraMenus: any[] = [];

  constructor(props) {
    super(props);
    this.state = { showMenu: false };

    pluginNavigations().forEach((menu, index) => {
      if (index < 5) {
        this.mainMenus.push(menu);
      } else {
        this.extraMenus.push(menu);
      }
    });
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

  loadMore = () => {
    this.setState({ showMenu: true });
  };

  moreIrem = () => {
    return (
      <LoadMore>
        <LoadMoreSearch>search</LoadMoreSearch>
        <LoadMoreRecentAdd>
          {this.extraMenus.map(menu => (
            <NavLink to={this.getLink(menu.url)}>
              <NavIcon className={menu.icon} />
              <label>{__(menu.text)}</label>
            </NavLink>
          ))}
        </LoadMoreRecentAdd>
      </LoadMore>
    );
  };

  render() {
    const { unreadConversationsCount } = this.props;
    const { showMenu } = this.state;
    const logo = 'erxes.png';
    const thLogo = getThemeItem('logo');

    const unreadIndicator = unreadConversationsCount !== 0 && (
      <Label shake={true} lblStyle="danger" ignoreTrans={true}>
        {unreadConversationsCount}
      </Label>
    );

    const lbl = <SmallLabel>Beta</SmallLabel>;
    const nsn = <NewStyle>New</NewStyle>;

    return (
      <LeftNavigation>
        <NavLink to="/">
          <img
            src={thLogo ? readFile(thLogo) : `/images/${logo}`}
            alt="erxes"
          />
        </NavLink>

        <Nav id="navigation">
          {pluginsOfNavigations(this.renderNavItem)}
          {this.mainMenus.map((nav, index) => (
            <NavItem key={index}>
              <NavLink to={this.getLink(nav.url)}>
                <NavIcon className={nav.icon} />
                <label>{__(nav.text)}</label>
                {/* {this.renderNavItem('', nav.text, nav.url, nav.icon)} */}
              </NavLink>
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

          <LoadItem>
            <Button
              size="small"
              btnStyle="primary"
              onClick={this.loadMore}
              icon="angle-double-down"
            >
              {showMenu ? 'Load more' : 'less more'}
            </Button>
            {this.moreIrem()}
          </LoadItem>

          {/* {this.renderNavItem(
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

          {/* //   <li
            //   key={index}
            //   style={index > 5 && !showMenu ? { display: 'none' } : {}}
            // >
            //   <span>{menu}</span>
            // </li>
                 
            //      )}
            //   )
            <span onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? 'Less more' : 'Load more'}
            </span>
           */}
          {/* return (
          // <>
          //   <ul>
          //     {menus.map((menu, index) => (
          //       <li
          //         key={index}
          //         style={index > 5 && !showMenu ? { display: 'none' } : {}}
          //       >
          //         <span>{menu}</span>
          //       </li>
          //     ))}
          //   </ul>
          //   <span onClick={() => setShowMenu(!showMenu)}>
          //     {showMenu ? 'Less more' : 'Load more'}
          //   </span>
          // </>
          // ); */}
        </Nav>
      </LeftNavigation>
    );
  }
}

export default Navigation;
