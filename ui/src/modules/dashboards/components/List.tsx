import { EmptyContent } from 'modules/automations/styles';
import Button from 'modules/common/components/Button';
import DataWithLoader from 'modules/common/components/DataWithLoader';
import FormControl from 'modules/common/components/form/Control';
import Table from 'modules/common/components/table';
import withTableWrapper from 'modules/common/components/table/withTableWrapper';
import { __ } from 'modules/common/utils';
import Sidebar from './Sidebar';
import Wrapper from 'modules/layout/components/Wrapper';
import { BarItems } from 'modules/layout/styles';
import React from 'react';
import { IRouterProps } from 'modules/common/types';
import Row from './Row';
import { IDashboard } from '../types';

interface IProps extends IRouterProps {
  addDashboard: () => void;
  dashboards: IDashboard[];
  removeDashboard: (dashboardId: string) => void;
  //Promise<any>
}

class DashboardList extends React.Component<IProps> {
  moveCursorAtTheEnd = e => {
    const tmpValue = e.target.value;
    e.target.value = '';
    e.target.value = tmpValue;
  };

  render() {
    const {
      // history,
      //  loading,
      // toggleBulk,
      // bulk,
      // isAllSelected,
      // totalCount,
      // queryParams,
      // isExpand,
      // counts,
      addDashboard,
      dashboards,
      removeDashboard
    } = this.props;

    const mainContent = (
      <withTableWrapper.Wrapper>
        <Table whiteSpace="nowrap" bordered={true} hover={true}>
          <thead>
            <tr>
              <th>
                <FormControl
                  // checked={isAllSelected}
                  componentClass="checkbox"
                  // onChange={this.onChange}
                />
              </th>
              <th>{__('Name')}</th>
              <th>{__('Status')}</th>
              {/* <th>{__('Charts')}</th> */}
              <th>{__('Created by')}</th>
              {/* <th>{__('Last updated by')}</th> */}
              <th>{__('Created date')}</th>
              {/* <th>{__('Last update')}</th> */}
              <th>{__('Actions')}</th>
            </tr>
          </thead>
          <tbody id="automations" className={'expand'}>
            {(dashboards || []).map(dashboard => (
              <Row
                key={dashboard._id}
                dashboard={dashboard}
                // isChecked={bulk.includes(dashboard)}
                // history={history}
                removeDashboard={removeDashboard}
                // toggleBulk={toggleBulk}
              />
            ))}
          </tbody>
        </Table>
      </withTableWrapper.Wrapper>
    );

    let actionBarLeft: React.ReactNode;

    const actionBarRight = (
      <BarItems>
        <FormControl
          type="text"
          placeholder={__('Search...')}
          // onChange={this.search}
          // value={this.state.searchValue}
          autoFocus={true}
          onFocus={this.moveCursorAtTheEnd}
        />
        <Button
          btnStyle="primary"
          size="small"
          icon="plus-circle"
          onClick={addDashboard}
        >
          {__('Create an dashboard')}
        </Button>
      </BarItems>
    );

    const actionBar = (
      <Wrapper.ActionBar right={actionBarRight} left={actionBarLeft} />
    );

    return (
      <Wrapper
        header={
          <Wrapper.Header
            title={__('Reports')}
            breadcrumb={[{ title: __('Reports') }]}
            // queryParams={queryParams}
          />
        }
        actionBar={actionBar}
        leftSidebar={Sidebar}
        // footer={<Pagination count={totalCount} />}
        content={
          <DataWithLoader
            data={mainContent}
            loading={false}
            emptyContent={
              <EmptyContent>
                <img src="/images/actions/automation.svg" alt="empty-img" />

                <p>
                  <b>{__('You don’t have any dashboards yet')}.</b>
                  {__(
                    'Automatically execute repetitive tasks and make sure nothing falls through the cracks'
                  )}
                  .
                </p>
              </EmptyContent>
            }
          />
        }
      />
    );
  }
}

export default DashboardList;
