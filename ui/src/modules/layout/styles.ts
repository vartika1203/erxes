import {
  BarItems,
  CenterContent,
  ContenFooter,
  ContentBox,
  ContentHeader,
  Contents,
  FieldStyle,
  FlexContent,
  FlexItem,
  FlexRightItem,
  HeightedWrapper,
  MainContent,
  PageHeader,
  SectionBodyItem,
  SidebarBox,
  SidebarCounter,
  SidebarFlexRow,
  SidebarList,
  SidebarTitle,
  WhiteBox,
  WhiteBoxRoot
} from 'erxes-ui/lib/layout/styles';
import { twinkling } from 'modules/common/utils/animations';
import styled, { css } from 'styled-components';
import styledTS from 'styled-components-ts';
import { getThemeItem } from 'utils';

import { colors, dimensions } from '../common/styles';
import { rgba } from '../common/styles/color';

const wideNavigation =
  dimensions.headerSpacingWide +
  dimensions.headerSpacingWide +
  dimensions.coreSpacing;

const thBackground = getThemeItem('background');
const thColor = getThemeItem('text_color');

const UserHelper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const Repostion = styled.div`
  position: relative;
`;

const Layout = styledTS<{ isSqueezed?: boolean }>(styled.main)`
  height: ${props => (props.isSqueezed ? 'calc(100% - 36px)' : '100%')};
  display: flex;
  flex: 1;
  max-width: 100%;
  position: relative;
  overflow: hidden;

  ${props =>
    props.isSqueezed &&
    css`
      ${PageHeader} {
        top: 36px;
      }
    `};
`;

const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: ${dimensions.headerSpacing}px;
  padding-left: ${dimensions.headerSpacing * 2}px;
  max-width: 100%;
  transition: width 0.3s;
`;

const Authlayout = styled.div`
  height: 100%;
  overflow: auto;
  position: relative;
  background: ${
    thBackground
      ? thBackground
      : `${colors.colorPrimaryDark} url('/images/stars.png') repeat top center;`
  }
  color: ${thColor ? thColor : ''}
  flex: 1;
  display: flex;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${
      thBackground
        ? thBackground
        : `transparent url('/images/twinkling.png') repeat top center;`
    }
    animation: ${twinkling} 200s linear infinite;
  }

  @media (max-width: 768px) {
    overflow: auto;
    padding-bottom: ${dimensions.coreSpacing * 5}px;
  }
`;

const AuthContent = styled(Repostion)`
  margin: auto;
`;

const AuthDescription = styled.div`
  margin: 20px 0;

  img {
    width: 100px;
    margin-bottom: 50px;
  }

  h1 {
    font-weight: bold;
    font-size: 34px;
    margin: 10px 0 30px;
    color: ${colors.colorWhite};
  }

  h2 {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.4em;
    font-weight: 500;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 50px;
    font-size: 18px;
    line-height: 1.8em;
  }

  a {
    color: rgba(255, 255, 255, 0.7);
    &:hover {
      color: ${colors.colorWhite};
    }
  }
  .not-found {
    margin-top: 0;
  }
`;

const MobileRecommend = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 12px;
  background: linear-gradient(
    to right,
    ${colors.colorSecondary},
    ${colors.colorCoreTeal}
  );
  color: ${colors.colorWhite};
  transition: all ease 0.3s;
  padding: 15px ${dimensions.coreSpacing}px;
  box-shadow: 0 -5px ${dimensions.unitSpacing}px 0 ${rgba(colors.colorBlack, 0.2)};
`;

const PasswordWithEye = styled.div`
  display: flex;
  align-items: center;

  > i {
    margin-left: 10px;
    margin-top: 3px;

    &:hover {
      color: ${colors.textPrimary};
      cursor: pointer;
    }
  }
`;

const LeftNavigation = styled.aside`
  width: ${dimensions.headerSpacing * 2 - 1}px;
  background: ${colors.colorWhite};
  box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.1);
  z-index: 11;
  flex-shrink: 0;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;

  > a {
    display: flex;
    margin-top: ${dimensions.unitSpacing / 2}px;
    height: ${dimensions.headerSpacing}px;
    justify-content: center;
    align-items: center;

    img {
      max-height: ${dimensions.coreSpacing + 15}px;
      transition: all 0.3s ease;
      max-width: 80%;
      color: ${colors.colorPrimary};

      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

const Nav = styled.nav`
  display: block;
  margin-top: ${dimensions.unitSpacing / 2}px;
  height: calc(100% - 130px);

  > div > a {
    display: flex;
    color: ${colors.bgLight}
    height: ${dimensions.headerSpacingWide}px;
    justify-content: center;
    position: relative;
    transition: all 0.3s ease;

    i {
      padding:0px, 14px, 0px, 0px;
      transition: all 0.3s ease;
    }

    label {
      cursor: pointer;
      font-size: 11px;
      letter-spacing: 0.4px;
      position: absolute;
      bottom: 5px;
      padding: 5px;
      text-align: center
      justify-content: center
      opacity: 0.6;
      color:${colors.colorBlack};
      width: ${dimensions.headerSpacing * 2 - 1}px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span {
      position: absolute;
      left: ${dimensions.coreSpacing + dimensions.coreSpacing - 1}px;
      bottom: 12px;
      padding: 4px;
      min-width: 19px;
      min-height: 19px;
      text-align: center
    }

    &.active {
      background: rgba(79, 51, 175, 0.08);

      &:before {
        content: "";
        width: 3px;
        background: ${colors.colorPrimary};
        height: 70px;
        position: absolute;
        display: block;
        left: 0;
        top:0;
        box-shadow: 0px 12px 24px rgba(79, 51, 175, 0.24), 0px 2px 6px rgba(79, 51, 175, 0.16), 0px 0px 1px rgba(79, 51, 175, 0.08);
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      > i, label {
        opacity: 1;
        color: ${colors.colorPrimary};
      }
    }

    &:focus {
      outline: 0;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.06);

      > i, label {
        opacity: 1;
        color: ${colors.colorPrimary};
      }
    }

    &.bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
    }

    @media (max-height: 760px) {
      height: ${dimensions.headerSpacing}px;

      i {
        line-height: ${dimensions.headerSpacing}px;
      }
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavIcon = styled.i`
  font-size: 22px;
  margin-top: 9px;
  opacity: 0.6;
  color: ${colors.colorBlack};
`;

const SubNav = styledTS(styled.ul)`
  background: ${colors.colorWhite};
  position: absolute;
  left: ${dimensions.headerSpacing * 2}px;
  word-wrap: break-word;
  width: 200px;
  max-height: 100vh;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  z-index: 999;
  visibility: hidden;
  top: 0;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.62);
  list-style: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  }
`;

const SubNavItem = styledTS<{ additional: boolean }>(styled.li)`
    > a {
      padding: ${dimensions.unitSpacing - 4}px ${dimensions.unitSpacing}px;
      margin: ${dimensions.unitSpacing - 5}px ${dimensions.unitSpacing}px;
      color: rgba(0, 0, 0, 0.62);
      display: flex;
      align-items: center;
      border-radius: ${props =>
        !props.additional && dimensions.unitSpacing - 5}px;
      border-top: ${props =>
        props.additional && `1px solid rgba(0, 0, 0, 0.08)`};
      border-bottom-left-radius: ${props =>
        props.additional && dimensions.unitSpacing - 5}px;
      border-bottom-right-radius: ${props =>
        props.additional && dimensions.unitSpacing - 5}px;

      > i {
        font-size: 16px;
        margin-right: ${dimensions.unitSpacing}px;
        color: ${colors.colorPrimary};
      }

      &.active {
        opacity: 1;
        font-weight: bold;
        position: relative;
        background: ${rgba(colors.colorBlack, 0.07)};
      }

      &:hover  {
        background: ${rgba(colors.colorBlack, 0.06)};
        opacity: 1;
      }
    }
`;

const SubNavTitle = styled.div`
  padding: ${dimensions.unitSpacing}px ${dimensions.coreSpacing}px 2px;
  text-transform: uppercase;
  color: ${colors.colorWhite};
  font-weight: 500;
`;

const NavItem = styled(Repostion)`
  &:hover {
    ${SubNav} {
      visibility: visible;
    }
  }
`;

const DropNav = styled.a`
  position: relative;
  display: flex !important;
  align-items: center;
  justify-content: space-between;

  ul {
    position: absolute;
    visibility: hidden;
    top: 0px;
    left: auto;
    margin: 0px;
    right: 0px;
    background: #fff;
    padding: 0;
    list-style: none;
    transform: translate(-240px, 0px);
    box-shadow: 0 5px 15px 1px rgba(0, 0, 0, 0.15);
  }

  &:hover {
    ul {
      visibility: visible;
    }
  }
`;

const ExpandIcon = styledTS<{ collapsed: boolean }>(styled.div)`
  background: ${props =>
    !props.collapsed ? colors.colorPrimaryDark : colors.colorWhite};
  position: absolute;
  top: 12px;
  z-index: 999;
  right: -12px;
  cursor: pointer;
  height: ${dimensions.coreSpacing + 5}px;
  width: ${dimensions.coreSpacing + 5}px;
  border-radius: ${dimensions.headerSpacing}px;
  text-align: center;
  transition: all 0.3s;

  > i {
    color: ${props =>
      props.collapsed ? colors.colorPrimaryDark : colors.colorWhite};
    line-height: ${dimensions.coreSpacing + 5}px;
    transition: all ease 0.3s;
  }

  &:hover {
    width: 30px;
    right: -15px;

    > i {
      float: ${props => (props.collapsed ? 'left' : 'right')};
    }
  }
}
`;

const SmallLabel = styled.div`
  position: absolute;
  text-transform: uppercase;
  font-weight: 500;
  font-size: ${dimensions.unitSpacing}px;
  color: ${colors.colorCoreTeal};
  right: ${dimensions.unitSpacing - 5}px;
  top: 3px;
`;

const NewStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${dimensions.unitSpacing - 6}px ${dimensions.unitSpacing - 4}px;
  position: absolute;
  width: ${dimensions.coreSpacing + 12}px;
  height: ${dimensions.coreSpacing - 4}px;
  left: ${dimensions.headerSpacingWide - 7}px;
  top: ${dimensions.unitSpacing - 7}px
  border-radius: ${dimensions.unitSpacing - 6}px
  color: rgba(255, 255, 255, 0.95);
  font-size: ${dimensions.unitSpacing}px
  line-height: ${dimensions.unitSpacing + 6}px
  letter-spacing: 0.4px;
  background-color: ${colors.colorCoreTeal};
`;
const AllAddedPlugin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: static;
  width: 382px;
  height: auto;
  left: ${dimensions.coreSpacing}px;
  top: 182px;
  margin: 20px 0px;
`;

const AllItemRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: static;
  width: 382px;
  height:  ${dimensions.headerSpacingWide}px
  left: 0px;
  top: ${dimensions.coreSpacing + 6}px;
  flex-wrap: wrap;
  margin: 8px 0px;
`;

const MoreRecentAdd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: static;
  width: 382px;
  height: ${dimensions.headerSpacingWide + 26}px;
  left: ${dimensions.coreSpacing}px;
  top: ${dimensions.headerSpacingWide - 4}px;
  align-self: stretch;
  margin: 20px 0px;
`;

const MoreTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  width: 348px;
  height: ${dimensions.coreSpacing - 2}px;
  left: 0px;
  top: 0px;
  letter-spacing: 0.1px;
  color: ${colors.colorPrimaryDark};
  order: 0;
  flex-grow: 0;
`;

const colWidth = 78;

const MoreItemRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: static;
  width: 304px;
  height: ${dimensions.headerSpacingWide}px;
  left: 0px;
  top: ${dimensions.coreSpacing + 6}px;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 8px 0px;
`;

const MoreItemRecent = styledTS<{
  order: number;
}>(styled.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: static;
  width: ${dimensions.headerSpacingWide}px;
  height: ${dimensions.headerSpacingWide}px;
  left: ${props => (props.order > 0 ? `${colWidth * props.order}px` : '0')}
  top: 0px;

  border: 1px solid rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  border-radius: ${dimensions.unitSpacing - 6}px;

  flex: none;
  order: 1;
  flex-grow: 0;
  margin-right: ${dimensions.unitSpacing - 5}px;
  margin-top: ${dimensions.unitSpacing - 5}px;

    > a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

    i {
      padding:0px, 14px, 0px, 0px;
    }

    label {
      font-size: ${dimensions.unitSpacing + 1}px;
      letter-spacing: 0.4px;
      position: static;
      cursor: pointer;
      bottom: ${dimensions.unitSpacing - 1}px;
      padding: ${dimensions.unitSpacing - 5}px;
      text-align: center
      opacity: 0.6;
      color: ${colors.colorBlack};
      width: ${dimensions.headerSpacingWide}px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; 
    }

    &.active {
      background: rgba(79, 51, 175, 0.08);


      > i, label {
        opacity: 1;
        color: ${colors.colorPrimary};
      }
    }

    &:focus {
      outline: 0;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.06);

      > i, label {
        opacity: 1;
        color: ${colors.colorPrimary};
      }
    }


    @media (max-height: 760px) {
      height: ${dimensions.headerSpacing}px;

      i {
        line-height: ${dimensions.headerSpacing}px;
      }
    }
  }
`;

const MoreMenu = styledTS<{ visible: boolean }>(styled.div)`
  position: relative;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  padding:${dimensions.coreSpacing}px;
  width: 422px;
  height: 298px;
  overflow-y: scroll;
  left: ${dimensions.headerSpacing * 2 - 1}px;
  bottom: ${dimensions.headerSpacingWide + 1}px;
  background: ${colors.colorWhite};
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);
`;

const MoreSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 4px 4px 8px;
  position: static;
  width: 370px;
  height: ${dimensions.coreSpacing + 6}px;
  left: ${dimensions.coreSpacing}px;
  top: ${dimensions.coreSpacing}px;
  background: ${colors.bgActive};
  border-radius: ${dimensions.headerSpacingWide - 1}px;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 20px 0px;
  color: ${colors.colorCoreGray};

  i {
    color: rgba(0, 0, 0, 0.95);
    padding: ${dimensions.unitSpacing - 5}px;
  }

  input {
    border-bottom: none;
    transition: none;
  }
`;

const StoreItem = styledTS(styled.div)`
  bottom:${dimensions.headerSpacingWide}px;
  position: relative;
  transition: all 0.3s ease;
`;

// const GlobalProfile = styledTS<{ visibile: Boolean }>(styled.div)`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   padding: ${dimensions.coreSpacing}px;
//   position: relative;
//   width: 298px;
//   height: 288px;
//   left: 100px;
//   color: #000;
//   border: 1px solid rgba(0, 0, 0, 0.08);
//   visibility: ${props => (props.visibile ? 'visible' : 'hidden')};
//   background: ${colors.colorWhite};
// `;

export {
  Layout,
  MoreMenu,
  MoreSearch,
  StoreItem,
  MoreTitle,
  MoreItemRow,
  AllAddedPlugin,
  AllItemRow,
  MoreRecentAdd,
  MoreItemRecent,
  NewStyle,
  MainWrapper,
  HeightedWrapper,
  Contents,
  MainContent,
  ContentBox,
  ContenFooter,
  ContentHeader,
  CenterContent,
  BarItems,
  SidebarBox,
  SidebarCounter,
  SidebarFlexRow,
  SidebarTitle,
  UserHelper,
  SidebarList,
  FlexContent,
  FlexItem,
  FlexRightItem,
  WhiteBoxRoot,
  WhiteBox,
  Authlayout,
  AuthContent,
  AuthDescription,
  SectionBodyItem,
  MobileRecommend,
  FieldStyle,
  PasswordWithEye,
  LeftNavigation,
  Nav,
  NavIcon,
  SubNav,
  NavItem,
  SubNavTitle,
  SubNavItem,
  DropNav,
  ExpandIcon,
  SmallLabel,
  Repostion
};
