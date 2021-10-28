import FormControl from 'modules/common/components/form/Control';
import React from 'react';
import dayjs from 'dayjs';
import Label from 'modules/common/components/Label';
import Icon from 'modules/common/components/Icon';
import { DateWrapper } from 'modules/common/styles/main';
import { __ } from 'modules/common/utils';
import ActionButtons from 'modules/common/components/ActionButtons';
import WithPermission from 'modules/common/components/WithPermission';
import Tip from 'modules/common/components/Tip';
import Button from 'modules/common/components/Button';
import { IDashboard } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  dashboard: IDashboard;
  history: any;
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

  const editAction = () => {
    return (
      <Link to={`/dashboards/details/${dashboard._id}`}>
        <Button btnStyle="link">
          <Tip text={__('Edit')} placement="top">
            <Icon icon="edit-3" />
          </Tip>
        </Button>
      </Link>
    );
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
        <Label lblStyle={labelStyle}>{'draft'}</Label>
      </td>
      <td>chart</td>
      <td>createdBy</td>
      <td>
        {/* <Icon icon="calender" />{' '}
        <DateWrapper>{dayjs(name || new Date()).format('ll')}</DateWrapper> */}
        last updated by
      </td>
      <td>
        <Icon icon="calender" />{' '}
        <DateWrapper>{dayjs(name || new Date()).format('ll')}</DateWrapper>
      </td>
      <td>
        <ActionButtons>
          {editAction()}
          {removeAction()}
        </ActionButtons>
      </td>
    </tr>
  );
}

export default ActionRow;
