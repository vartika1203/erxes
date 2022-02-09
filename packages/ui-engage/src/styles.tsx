import { colors, dimensions } from "@erxes/ui/src/styles";
import { rgba } from "@erxes/ui/src/styles/ecolor";
import styled from "styled-components";
import styledTS from "styled-components-ts";

const coreSpace = `${dimensions.coreSpacing}px`;

const LogoContainer = styled.div`
  color: ${colors.colorWhite};
  line-height: 56px;
  text-align: center;
  border-radius: 28px;
  width: 56px;
  height: 56px;
  cursor: pointer;
  box-shadow: 0 0 ${dimensions.unitSpacing}px 0 ${rgba(colors.colorBlack, 0.2)};
  background-image: url("/images/erxes.png");
  background-color: ${colors.colorPrimary};
  background-position: center;
  background-size: 20px;
  background-repeat: no-repeat;
  margin-top: ${dimensions.unitSpacing}px;
  position: relative;
  float: right;
  display: table;

  span {
    position: absolute;
    width: ${coreSpace};
    height: ${coreSpace};
    background: ${colors.colorCoreRed};
    display: block;
    right: -2px;
    top: -5px;
    color: ${colors.colorWhite};
    border-radius: ${dimensions.unitSpacing}px;
    text-align: center;
    line-height: ${coreSpace};
    font-size: ${dimensions.unitSpacing}px;
  }

  input[type="file"] {
    display: none;
  }

  label {
    display: block;
    margin: 0;
    visibility: hidden;
    border-radius: 50%;
  }

  &:hover label {
    visibility: visible;
    cursor: pointer;
  }
`;

const LauncherContainer = styled(LogoContainer)`
  position: absolute;
  right: ${dimensions.unitSpacing}px;
  bottom: ${dimensions.unitSpacing}px;
`;

const RowTitle = styled.div`
  > a {
    color: ${colors.textPrimary};
  }

  &:hover {
    text-decoration: underline;
    color: ${colors.colorBlack};
    cursor: pointer;
  }
`;

const PreviewContent = styledTS<{
  isFullmessage: boolean;
  showOverflow?: boolean;
}>(styled.div)`
  padding: 0 ${coreSpace};
  line-height: 22px;
  margin-bottom: ${coreSpace};
  color: ${colors.colorCoreGray};
  font-size: 14px;
  word-break: break-word;
  min-height: 500px;

  ${(props) => {
    if (!props.isFullmessage) {
      return `
        overflow: ${props.showOverflow ? "auto" : "hidden"};
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        word-wrap: break-word;
      `;
    }
    return null;
  }};
`;

const WidgetPreviewStyled = styled.div`
  background: ${colors.colorWhite};
  color: ${colors.colorWhite};
  border-radius: ${dimensions.unitSpacing}px;
  border-bottom-right-radius: 25px;
  bottom: 80px;
  box-shadow: 0 2px 16px 1px ${rgba(colors.colorBlack, 0.2)};
  display: flex;
  flex-direction: column;
  height: calc(100% - 95px);
  max-height: 660px;
  overflow: hidden;
  position: absolute;
  right: 8px;
  width: 380px;
  z-index: 1;
`;

const WidgetPreview = styled(WidgetPreviewStyled)`
  height: auto;
  bottom: 90px;
  right: ${coreSpace};
  max-height: calc(100% - 95px);
  max-width: calc(100% - 40px);
`;

const WebPreview = styledTS<{ isEngage?: boolean }>(styled.div)`
  min-height: 100%;
  position: relative;
  background: linear-gradient(
    140deg,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0.08) 95%,
    rgba(0, 0, 0, 0.1) 100%
  );
  width: ${(props) => props.isEngage && "100%"};

  .engage-message {
    > div:first-of-type {
      flex-shrink: 0;
      padding: ${coreSpace} ${coreSpace} 10px ${coreSpace};
    }
  }
`;

const Recipients = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
`;

const Recipient = styled.div`
  padding: 3px 6px;
  border: 1px solid ${colors.colorShadowGray};
  border-radius: 4px;
  display: flex;
  margin-right: 5px;
  margin-bottom: 5px;
  background: ${colors.bgLight};
  font-size: 13px;

  > span {
    margin-left: 6px;
    background: rgba(0, 0, 0, 0.05);
    padding: 0 3px;
    border-radius: 2px;
    margin-right: -2px;

    &:hover {
      color: ${colors.colorCoreRed};
      cursor: pointer;
      background: rgba(0, 0, 0, 0.08);
    }
  }
`;

const Half = styled.div`
  width: 50%;

  &:last-of-type {
    border: none;
  }
`;

export {
  RowTitle,
  LauncherContainer,
  PreviewContent,
  WebPreview,
  WidgetPreview,
  Half,
  Recipient,
  Recipients,
};
