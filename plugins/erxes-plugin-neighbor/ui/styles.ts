// import { PipelinePopoverContent } from 'erxes-ui/lib/boards/styles/item';
// import Button from 'modules/common/components/Button';
// import { colors, dimensions } from 'modules/common/styles';
// import { rgba } from 'modules/common/styles/color';
import styled, { css } from 'styled-components';
import { Formgroup } from '../../../ui/src/modules/common/components/form/styles';
import { colors, dimensions } from '../../../ui/src/modules/common/styles';
import React from 'react';
import styledTS from 'styled-components-ts';

// import styledTS from 'styled-components-ts';
// import { borderRadius } from './common';

const buttonColor = '#0a1e3c';

export const TabContent = styled.div`
  padding: 15px 20px 0px 20px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
`;

export const Row = styled.div`
  display: flex;

  .Select {
    flex: 1;
  }

  button {
    flex-shrink: 0;
    margin-left: 10px;
    align-self: baseline;
  }
`;
export const FlexContent = styled.div`
  display: flex;

  ${Formgroup} {
    margin-right: 20px;
  }
`;

export const FlexRow = styled(FlexContent)`
  justify-content: space-between;

  > i {
    color: ${colors.colorCoreRed};
    margin-right: 5px;
  }
`;

export const ContainerFragment = styled(React.Fragment)`
`;



