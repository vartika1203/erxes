import _ from 'lodash';
import React from 'react';
import { IOrder } from '../types';
import Button from 'erxes-ui/lib/components/Button';
import { FinanceAmount } from '../../styles';

type Props = {
  order: IOrder;
  history: any;
  onSyncErkhet: (orderId: string) => void;
};

function displayValue(order, name) {
  const value = _.get(order, name);
  return <FinanceAmount>{(value || 0).toLocaleString()}</FinanceAmount>;
}

function PutResponseRow({ order, onSyncErkhet }: Props) {

  const onClick = e => {
    e.stopPropagation();
    onSyncErkhet(order._id);
  };


  return (
    <tr>
      <td key={'BillID'}>{order.number} </td>
      <td key={'Date'}>{order.paidDate || order.createdAt}</td>
      <td key={'cashAmount'}>{displayValue(order, 'cashAmount')}</td>
      <td key={'cardAmount'}>{displayValue(order, 'cardAmount')}</td>
      <td key={'mobileAmount'}>{displayValue(order, 'mobileAmount')}</td>
      <td key={'totalAmount'}>{displayValue(order, 'totalAmount')}</td>
      <td key={'customer'}>{order.customer ? order.customer.primaryEmail || order.customer.primaryPhone || order.customer.firstName : ''}</td>
      <td key={'pos'}>{order.posName || ''}</td>
      <td key={'user'}>{order.user ? order.user.email : ''}</td>
      <td key={'actions'}>
        {
          !order.syncedErkhet &&
          <Button
            btnStyle="link"
            size="small"
            icon="external-link-alt"
            onClick={onClick}
          ></Button>
        }
      </td>
    </tr>
  );
}

export default PutResponseRow;