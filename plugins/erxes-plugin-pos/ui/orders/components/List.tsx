import {
  __, Button, DataWithLoader, FormControl, Pagination, router,
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

    let actionBarLeft: React.ReactNode;

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
                <SortHandler sortField={'amount'} label={__('Amount')} />
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

    const menuPos = [
      { title: 'Put Response', link: '/erxes-plugin-ebarimt/put-responses' },
      { title: 'Pos Orders', link: '/erxes-plugin-pos/pos-orders' }
    ];

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