import {
  __, Button, DataWithLoader, FormControl, Pagination, router,
  SortHandler, Table, Wrapper, BarItems
} from 'erxes-ui';
import { IRouterProps } from 'erxes-ui/lib/types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { TableWrapper } from '../../styles';
import { IOrder } from '../types';
import Row from './Row';

interface IProps extends IRouterProps {
  orders: IOrder[];
  loading: boolean;
  searchValue: string;
  totalCount: number;
  bulk: any[];
  isAllSelected: boolean;
  history: any;
  queryParams: any;
}

type State = {
  searchValue?: string;
};

class Orders extends React.Component<IProps, State> {
  private timer?: NodeJS.Timer = undefined;

  constructor(props) {
    super(props);

    this.state = {
      searchValue: this.props.searchValue
    };
  }

  search = e => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    const { history } = this.props;
    const searchValue = e.target.value;

    this.setState({ searchValue });
    this.timer = setTimeout(() => {
      router.removeParams(history, 'page');
      router.setParams(history, { searchValue });
    }, 500);
  };

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
      queryParams
    } = this.props;
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

    let actionBarLeft: React.ReactNode;

    const actionBarRight = (
      <BarItems>
        <FormControl
          type="text"
          placeholder={__('Type to search')}
          onChange={this.search}
          value={this.state.searchValue}
          autoFocus={true}
          onFocus={this.moveCursorAtTheEnd}
        />

      </BarItems>
    );

    const actionBar = (
      <Wrapper.ActionBar right={actionBarRight} left={actionBarLeft} />
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
        actionBar={actionBar}
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