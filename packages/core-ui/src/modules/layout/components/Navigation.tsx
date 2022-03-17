import WithPermission from "modules/common/components/WithPermission";
import { __, readFile } from "modules/common/utils";
import { pluginNavigations, pluginsOfNavigations } from "pluginUtils";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LeftNavigation,
  NavIcon,
  Nav,
  SubNav,
  NavItem,
  SubNavItem,
  MoreMenuWrapper,
  MoreSearch,
  MoreItemRecent,
  MoreMenus,
  MoreTitle,
  NavMenuItem,
} from "../styles";
import { getThemeItem } from "utils";
import Icon from "modules/common/components/Icon";
import FormControl from "modules/common/components/form/Control";

export interface ISubNav {
  permission: string;
  link: string;
  value: string;
  icon: string;
  additional?: boolean;
}

type State = {
  showMenu: boolean;
  moreMenus: any[];
  searchText: string;
};

class Navigation extends React.Component<{}, State> {
  private wrapperRef;

  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      moreMenus: pluginNavigations().slice(4) || [],
      searchText: "",
    };
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  getLink = (url) => {
    const storageValue = window.localStorage.getItem("pagination:perPage");

    let parsedStorageValue;

    try {
      parsedStorageValue = JSON.parse(storageValue || "");
    } catch {
      parsedStorageValue = {};
    }

    if (url.includes("?")) {
      const pathname = url.split("?")[0];

      if (!url.includes("perPage") && parsedStorageValue[pathname]) {
        return `${url}&perPage=${parsedStorageValue[pathname]}`;
      }
      return url;
    }

    if (parsedStorageValue[url]) {
      return `${url}?perPage=${parsedStorageValue[url]}`;
    }

    return url;
  };

  onSearch = (value: string) => {
    const filteredValue = (val) => val.text.toLowerCase().includes(value);

    this.setState({
      moreMenus: pluginNavigations()
        .slice(4)
        .filter(filteredValue),
    });
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showMenu: false });
    }
  };

  onClickMore = () => {
    this.setState({ showMenu: !this.state.showMenu });
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

  renderMenuItem(nav) {
    const { icon, text, url, label } = nav;

    return (
      <NavMenuItem>
        <NavLink
          to={this.getLink(url)}
          onClick={() => this.setState({ showMenu: false })}
        >
          <NavIcon className={icon} />
          <label>{__(text)}</label>
          {label}
        </NavLink>
      </NavMenuItem>
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
        {this.renderMenuItem({ icon, url, text, label })}
        {this.renderChildren(url, text, childrens)}
      </NavItem>
    );

    if (!childrens || childrens.length === 0) {
      return (
        <WithPermission key={url} action={permission}>
          {item}
        </WithPermission>
      );
    }

    return (
      <WithPermission key={url} action={permission}>
        {item}
      </WithPermission>
    );
  };

  renderMorePlugins = () => {
    const { showMenu, moreMenus } = this.state;

    return (
      <MoreMenuWrapper visible={showMenu}>
        <MoreSearch>
          <Icon icon="search-1" size={15} />
          <FormControl
            onChange={(e: any) =>
              this.onSearch(e.target.value.trim().toLowerCase())
            }
            type="text"
            placeholder="Find plugins"
          />
        </MoreSearch>
        <MoreTitle>{__("Other added plugins")}</MoreTitle>
        <MoreMenus>
          {moreMenus.map((menu, index) => (
            <MoreItemRecent key={index}>
              {this.renderNavItem(
                menu.permission,
                menu.text,
                menu.url,
                menu.icon
              )}
            </MoreItemRecent>
          ))}
        </MoreMenus>
      </MoreMenuWrapper>
    );
  };

  renderMore = () => {
    if (pluginNavigations().length <= 4) {
      return null;
    }

    return (
      <div ref={this.setWrapperRef}>
        <NavItem>
          <NavMenuItem>
            <a onClick={() => this.onClickMore()}>
              <NavIcon className="icon-ellipsis-h" />
              <label>{__("More")}</label>
            </a>
          </NavMenuItem>

          {this.renderMorePlugins()}
        </NavItem>
      </div>
    );
  };

  render() {
    const Navs = pluginNavigations().slice(0, 4);
    const logo = "logo-dark.png";
    const thLogo = getThemeItem("logo");

    return (
      <LeftNavigation>
        <NavLink to="/">
          <img
            src={thLogo ? readFile(thLogo) : `/images/${logo}`}
            alt="erxes"
          />
        </NavLink>

        <Nav id="navigation">
          {Navs.map((nav) =>
            this.renderNavItem(nav.permission, nav.text, nav.url, nav.icon)
          )}

          {pluginsOfNavigations(this.renderNavItem)}

          {this.renderMenuItem({
            text: "Settings",
            url: "/settings",
            icon: "icon-settings",
          })}

          {this.renderMore()}
        </Nav>
      </LeftNavigation>
    );
  }
}

export default Navigation;
