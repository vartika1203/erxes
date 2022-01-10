import {
  __, DataWithLoader, Pagination,
  SortHandler, Table, Wrapper, BarItems
} from 'erxes-ui';
import { IRouterProps } from 'erxes-ui/lib/types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { TableWrapper } from '../../styles';
import { IOrder, OrdersSummaryQueryResponse } from '../types';
import HeaderDescription from './MainHead';
import RightMenu from './RightMenu';
import Row from './Row';

interface IProps extends IRouterProps {
  orders: IOrder[];
  loading: boolean;
  totalCount: number;
  bulk: any[];
  isAllSelected: boolean;
  history: any;
  queryParams: any;

  onSearch: (search: string) => void;
  onSelect: (values: string[] | string, key: string) => void;
  isFiltered: boolean;
  clearFilter: () => void;
  summaryQuery: OrdersSummaryQueryResponse;
}

export const menuPos = [
  { title: 'Put Response', link: '/erxes-plugin-ebarimt/put-responses' },
  { title: 'Pos Orders', link: '/erxes-plugin-pos/pos-orders' },
  { title: 'Pos Items', link: '/erxes-plugin-pos/pos-order-items' }
];

class Orders extends React.Component<IProps, {}> {
  private timer?: NodeJS.Timer = undefined;

  constructor(props) {
    super(props);
  }

  moveCursorAtTheEnd = e => {
    const tmpValue = e.target.value;
    e.target.value = '';
    e.target.value = tmpValue;
  };

  render() {
    const {
      orders,
      history,
      loading,
      totalCount,
      queryParams,
      onSelect,
      onSearch,
      isFiltered,
      clearFilter,
      summaryQuery
    } = this.props;

    const rightMenuProps = {
      onSelect,
      onSearch,
      isFiltered,
      clearFilter,
      queryParams,
    };

    const actionBarRight = (
      <BarItems>
        <RightMenu {...rightMenuProps} />
      </BarItems>
    );


    const header = (
      <HeaderDescription
        icon="/images/actions/26.svg"
        title={__('Summary')}
        summaryQuery={summaryQuery}
        actionBar={actionBarRight}
      />
    );

    const mainContent = (
      <TableWrapper>
        <Table whiteSpace="nowrap" bordered={true} hover={true}>
          <thead>
            <tr>
              <th>
                <SortHandler sortField={'billId'} label={__('Bill number')} />
              </th>
              <th>
                <SortHandler sortField={'date'} label={__('Date')} />
              </th>
              <th>
                <SortHandler sortField={'cashAmount'} label={__('Cash Amount')} />
              </th>
              <th>
                <SortHandler sortField={'cardAmount'} label={__('Card Amount')} />
              </th>
              <th>
                <SortHandler sortField={'mobileAmount'} label={__('Mobile Amount')} />
              </th>
              <th>
                <SortHandler sortField={'totalAmount'} label={__('Amount')} />
              </th>
              <th>
                <SortHandler sortField={'Customer'} label={__('Customer')} />
              </th>
              <th>
                <SortHandler sortField={'Pos'} label={__('Pos')} />
              </th>
              <th>
                <SortHandler sortField={'User'} label={__('User')} />
              </th>
              <th>
                Үйлдлүүд
              </th>
            </tr>
          </thead>
          <tbody id="orders">
            {(orders || []).map(order => (
              <Row
                order={order}
                key={order._id}
                history={history}
              />
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    );

    return (
      <Wrapper
        header={
          <Wrapper.Header
            title={__(`Put Response`)}
            queryParams={queryParams}
            submenu={menuPos}
          />
        }
        mainHead={header}
        footer={<Pagination count={totalCount} />}
        content={
          <DataWithLoader
            data={mainContent}
            loading={loading}
            count={(orders || []).length}
            emptyText="Add in your first order!"
            emptyImage="/images/actions/1.svg"
          />
        }
      />
    );
  }
}

export default withRouter<IRouterProps>(Orders);