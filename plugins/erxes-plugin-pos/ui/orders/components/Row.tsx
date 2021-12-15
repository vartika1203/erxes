import _ from 'lodash';
import {
  formatValue
} from 'erxes-ui';
import React from 'react';
import { IOrder } from '../types';
import Button from 'erxes-ui/lib/components/Button';

type Props = {
  order: IOrder;
  history: any;
};

function displayValue(order, name) {
  const value = _.get(order, name);
  return formatValue(value);
}

function PutResponseRow({ order, history }: Props) {

  const onClick = e => {
    e.stopPropagation();
  };


  return (
    <tr>
      <td key={'BillID'}>{order.number} </td>
      <td key={'Date'}>{order.createdAt}</td>
      <td key={'totalAmount'}>{displayValue(order, 'totalAmount')}</td>
      <td key={'actions'}>
        <Button
          btnStyle="link"
          size="small"
          icon="external-link-alt"
          onClick={onClick}
        ></Button>
      </td>
    </tr>
  );
}

export default PutResponseRow;