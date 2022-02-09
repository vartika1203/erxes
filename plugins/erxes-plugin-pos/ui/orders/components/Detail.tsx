import * as dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import {
  __,
  FieldStyle,
  SidebarCounter,
  SidebarList,
  Table
} from 'erxes-ui';
import { FinanceAmount, FlexRow } from '../../styles';
import { IOrder } from '../types';

type Props = {
  order: IOrder;
  productById: any;
};

class PutResponseDetail extends React.Component<Props> {
  displayValue(order, name) {
    const value = _.get(order, name);
    return <FinanceAmount>{(value || 0).toLocaleString()}</FinanceAmount>;
  }

  renderRow(label, value) {
    return (
      <li>
        <FlexRow>
          <FieldStyle>{__(`${label}`)}:</FieldStyle>
          <SidebarCounter>
            {value || '-'}
          </SidebarCounter>
        </FlexRow>
      </li>
    );
  }

  render() {
    const { order, productById } = this.props;
    return (
      <SidebarList>
        {this.renderRow('Bill Number', order.number)}
        {this.renderRow('Date', dayjs(order.paidDate || order.createdAt).format('lll'))}

        <Table whiteSpace="nowrap" bordered={true} hover={true}>
          <thead>
            <tr>
              <th>
                {__('Product')}
              </th>
              <th>
                {__('Count')}
              </th>
              <th>
                {__('Unit Price')}
              </th>
              <th>
                {__('Amount')}
              </th>
            </tr>
          </thead>
          <tbody id="orderItems">
            {(order.items || []).map(item => (
              <tr key={item._id}>
                <td>{productById[item.productId].name}</td>
                <td>{item.count}</td>
                <td>{item.unitPrice}</td>
                <td>{item.count * item.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {this.renderRow('Total Amount', this.displayValue(order, 'totalAmount'))}

        <ul>
          {this.renderRow('Cash Amount', this.displayValue(order, 'cashAmount'))}
          {this.renderRow('Card Amount', this.displayValue(order, 'cardAmount'))}
          {this.renderRow('Mobile Amount', this.displayValue(order, 'mobileAmount'))}
        </ul>
      </SidebarList>
    )
  }
}

export default PutResponseDetail;