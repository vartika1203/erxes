import ActionButtons from '@erxes/ui/src/components/ActionButtons';
import Label from '@erxes/ui/src/components/Label';
import TextInfo from '@erxes/ui/src/components/TextInfo';
import React from 'react';
import { IParticipant } from '../../types';
import { renderFullName } from '@erxes/ui/src/utils/core';
import Toggle from '@erxes/ui/src/components/Toggle';

type Props = {
  participant: IParticipant;
  onChangeStatus: (selectedId: string, isChecked: boolean) => void;
};

class Row extends React.Component<Props> {
  renderAction() {
    const { participant, onChangeStatus } = this.props;

    const onChange = e => {
      onChangeStatus(participant._id, e.target.checked);
    };

    const checked = participant.status === 'won';

    return (
      <div>
        <Toggle
          id="toggle"
          onChange={onChange}
          defaultChecked={checked}
          checked={checked}
          icons={{
            checked: <span>Yes</span>,
            unchecked: <span>No</span>
          }}
        />
      </div>
    );
  }

  render() {
    const { participant } = this.props;
    const { customer } = participant;

    const labelStyle = participant.status === 'won' ? 'success' : 'warning';

    return (
      <tr>
        <td>
          <strong>{renderFullName(customer)}</strong>
        </td>
        <td>
          <TextInfo ignoreTrans={true}>
            {participant.detail.price || 0}
          </TextInfo>
        </td>
        <td>
          <Label lblStyle={labelStyle}>{participant.status}</Label>
        </td>
        <td>
          <ActionButtons>{this.renderAction()}</ActionButtons>
        </td>
      </tr>
    );
  }
}

export default Row;
