import Icon from 'modules/common/components/Icon';
import { colors } from 'modules/common/styles';
import { darken } from 'modules/common/styles/color';
import { rotate } from 'modules/common/utils/animations';
import React from 'react';
import styled from 'styled-components';

const ImportButton = styled.label`
  border-radius: 7px;
  transition: all 0.3s ease;
  padding: 6px 15px 6px 32px;
  background: ${colors.colorCoreGreen};
  font-size: 12px;
  color: ${colors.colorWhite};
  position: relative;
  font-weight: 500;

  i {
    top: 5px;
    position: absolute;
    left: 12px;
  }

  input {
    display: none;
  }

  &:hover {
    cursor: pointer;
    text-decoration: none;
    background: ${darken(colors.colorCoreGreen, 20)};
  }
`;

const ImportLoader = styled.i`
  width: 14px;
  height: 14px;
  animation: ${rotate} 0.75s linear infinite;
  border: 1px solid ${colors.borderDarker};
  border-top-color: ${colors.colorSecondary};
  border-right-color: ${colors.colorSecondary};
  border-radius: 100%;
`;

type Props = {
  uploadCsv: (e: React.FormEvent<HTMLInputElement>) => void;
  uploading: boolean;
  text: string;
};

function DataImporter({ uploadCsv, uploading, text }: Props) {
  return (
    <ImportButton>
      {uploading ? <ImportLoader /> : <Icon icon="import" />}
      {text}
      <input
        type="file"
        onChange={uploadCsv}
        accept=".csv"
        disabled={uploading}
      />
    </ImportButton>
  );
}

export default DataImporter;
