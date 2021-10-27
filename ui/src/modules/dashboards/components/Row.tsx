import FormControl from 'modules/common/components/form/Control';
import React from 'react';
// import { IAutomation } from '../types';
import dayjs from 'dayjs';
import Label from 'modules/common/components/Label';
import Icon from 'modules/common/components/Icon';
import { DateWrapper } from 'modules/common/styles/main';
// import s from 'underscore.string';
// import { FlexItem } from 'modules/companies/styles';
// import NameCard from 'modules/common/components/nameCard/NameCard';
// import ActionButtons from 'modules/common/components/ActionButtons';
// import { Link } from 'react-router-dom';
// import Button from 'modules/common/components/Button';
// import Tip from 'modules/common/components/Tip';
import { __ } from 'modules/common/utils';
import { IDashboard } from 'modules/dashboard/types';
import ActionButtons from 'modules/common/components/ActionButtons';
import WithPermission from 'modules/common/components/WithPermission';
import Tip from 'modules/common/components/Tip';
import Button from 'modules/common/components/Button';
// import WithPermission from 'modules/common/components/WithPermission';

type Props = {
  dashboard: IDashboard;
  history?: any;
  isChecked?: boolean;
  toggleBulk?: (dashboard: IDashboard, isChecked?: boolean) => void;
  removeDashboard: (dashboardId: string) => void;
};

function ActionRow({
  dashboard,
  history,
  isChecked,
  toggleBulk,
  removeDashboard
}: Props) {
  const onChange = e => {
    if (toggleBulk) {
      toggleBulk(dashboard, e.target.checked);
    }
  };

  const onClick = e => {
    e.stopPropagation();
  };

  const onNameClick = () => {
    history.push(`/dashboards/details/${dashboard._id}`);
  };

  const removeAction = () => {
    const onRemove = () => removeDashboard(dashboard._id);

    return (
      <WithPermission action="automationsRemove">
        <Tip text={__('Delete')} placement="top">
          <Button
            id="automationDelete"
            btnStyle="link"
            onClick={onRemove}
            icon="times-circle"
          />
        </Tip>
      </WithPermission>
    );
  };

  const {
    name
    // status,
    // updatedAt,
    // createdAt,
    // createdUser,
    // updatedUser,
    // actions
  } = dashboard;

  const isActive = false;
  const labelStyle = isActive ? 'success' : 'simple';

  return (
    <tr>
      <td id="automationsCheckBox" onClick={onClick}>
        <FormControl
          checked={isChecked}
          componentClass="checkbox"
          onChange={onChange}
        />
      </td>
      <td onClick={onNameClick}> {name} </td>
      <td>
        <Label lblStyle={labelStyle}>{name}</Label>
      </td>
      <td>
        <Icon icon="calender" />{' '}
        <DateWrapper>{dayjs(name || new Date()).format('ll')}</DateWrapper>
      </td>
      <td>
        <Icon icon="calender" />{' '}
        <DateWrapper>{dayjs(name || new Date()).format('ll')}</DateWrapper>
      </td>
      <td>
        <ActionButtons>
          {/* {editAction()} */}
          {removeAction()}
        </ActionButtons>
      </td>
    </tr>
  );
}

export default ActionRow;
