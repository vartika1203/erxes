import WithPermission from 'modules/common/components/WithPermission';
import { __, setBadge, readFile } from 'modules/common/utils';
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
  MoreTitle
} from '../styles';
import Tip from 'modules/common/components/Tip';
import { getThemeItem } from 'utils';
import Icon from 'modules/common/components/Icon';
import FormControl from 'modules/common/components/form/Control';

export interface ISubNav {
  permission: string;
  link: string;
  value: string;
  icon: string;
  additional?: boolean;
}

type IProps = {
  unreadConversationsCount?: number;
};

type State = {
  showMenu: boolean;
  extraMenus: any[];
  recentlyAddedMenus: any[];
  searchText: string;
};

class Navigation extends React.Component<IProps, State> {
  private mainMenus: any[] = [];
  private extraMenus: any[] = [];
  private recentlyAddedMenus: any[] = [];
  private wrapperRef: any;

  constructor(props) {
    super(props);

    pluginNavigations().forEach((menu, index) => {
      if (index < 5) {
        this.mainMenus.push(menu);
      }
      if (index > 4 && index < 10) {
        this.recentlyAddedMenus.push(menu);
      } else if (index > 10) {
        this.extraMenus.push(menu);
      }
    });

    this.state = {
      showMenu: false,
      extraMenus: this.extraMenus,
      recentlyAddedMenus: this.recentlyAddedMenus,
      searchText: ''
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showMenu: false });
    }
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

  onSearch = (value: string) => {
    const filter = m => m.text.toLowerCase().includes(value);

    this.setState({
      recentlyAddedMenus: this.recentlyAddedMenus.filter(filter),
      extraMenus: this.extraMenus.filter(filter)
    });
  };

  moreItem = () => {
    return (
      <div ref={this.setWrapperRef}>
        <MoreMenu visible={this.state.showMenu}>
          <MoreSearch>
            <Icon icon="search-1" size={15} />
            <FormControl
              onChange={(e: any) =>
                this.onSearch(e.target.value.trim().toLowerCase())
              }
              type="text"
              placeholder="find your use plugin"
            />
          </MoreSearch>
          <MoreRecentAdd>
            <MoreTitle>Recently added</MoreTitle>
            <MoreItemRow>
              {this.state.recentlyAddedMenus.map((menu, index) => (
                <MoreItemRecent key={index} order={index}>
                  <NavLink to={this.getLink(menu.url)}>
                    <NavIcon className={menu.icon} />
                    <label>{__(menu.text)}</label>
                  </NavLink>
                </MoreItemRecent>
              ))}
            </MoreItemRow>
          </MoreRecentAdd>
          <AllAddedPlugin>
            <MoreTitle>Other added plugin</MoreTitle>
            <AllItemRow>
              {this.state.extraMenus.map((menu, index) => (
                <MoreItemRecent key={index} order={index}>
                  <NavLink to={this.getLink(menu.url)}>
                    <NavIcon className={menu.icon} />
                    <label>{__(menu.text)}</label>
                  </NavLink>
                </MoreItemRecent>
              ))}
            </AllItemRow>
          </AllAddedPlugin>
        </MoreMenu>
      </div>
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
    const { showMenu } = this.state;
    const logo = 'erxes-dark.png';
    const thLogo = getThemeItem('logo');

    // const unreadIndicator = unreadConversationsCount !== 0 && (
    //   <Label shake={true} lblStyle='danger' ignoreTrans={true}>
    //     {unreadConversationsCount}
    //   </Label>
    // );

    // const lbl = <SmallLabel>Beta</SmallLabel>;
    const nsn = <NewStyle>New</NewStyle>;

    return (
      <LeftNavigation>
        <NavLink to="/nav">
          <img
            src={thLogo ? readFile(thLogo) : `/images/${logo}`}
            alt="erxes"
          />
          {/* <NavIcon className='icon-apps' />
          {this.globalProfile()} */}
        </NavLink>

        <Nav id="navigation">
          {pluginsOfNavigations(this.renderNavItem)}
          {this.mainMenus.map((nav, index) => (
            <NavItem key={index}>
              <NavLink to={this.getLink(nav.url)}>
                <NavIcon className={nav.icon} />
                <label>{__(nav.text)}</label>
                {index < 2 ? nsn : ''}
              </NavLink>
            </NavItem>
          ))}

          <NavItem>
            <NavLink to="/settings">
              <NavIcon className="icon-settings" />
              <label>{__('Settings')}</label>
            </NavLink>
          </NavItem>
          <Repostion>
            <NavLink
              to="/more"
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
        </Nav>
      </LeftNavigation>
    );
  }
}

export default Navigation;
