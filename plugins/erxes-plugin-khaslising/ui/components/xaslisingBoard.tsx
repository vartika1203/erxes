import React from 'react';
import { FullContent, MiddleContent } from '../../../../ui/src/modules/common/styles/main'
import {
  StatusBox,
  StatusTitle,
  FlexRow,
  ClearButton,
  ColorPickerWrapper,
  Domain
} from '../styles';
import {
  __,
  FormGroup,
  ControlLabel,
  FormControl,
  AvatarUpload,
  Tip,
  Icon,
  Button
} from 'erxes-ui';
import { ModalFooter } from 'modules/common/styles/main';
import Sidebar from 'modules/layout/components/Sidebar';

import {
  Wrapper, Alert, Table
} from 'erxes-ui';
// import { ModalFooter } from 'modules/common/styles/main';
import ModalTrigger from 'modules/common/components/ModalTrigger';
import LeftSidebar from 'modules/layout/components/Sidebar';
import { NavLink } from 'react-router-dom';
import SidebarHeader from 'modules/settings/common/components/SidebarHeader';
import { SidebarList } from 'modules/layout/styles';
import { Tabs, TabTitle } from 'modules/common/components/tabs'
import ActionButtons from 'modules/common/components/ActionButtons';
// import {
//   ColorPick,
//   ColorPicker,
//   ExpandWrapper,
//   MarkdownWrapper
// } from 'modules/settings/styles';
// import Select from 'react-select-plus';
type Props = {}
type State = { currentTab: string }
class XaslisingBoard extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = { currentTab: 'a' }

  }

  onChange = (name: string, value: any) => {
    this.setState({ [name]: value } as any)
  };

  renderEdit() {

    const renderContent = () => {
      return (
        <React.Fragment></React.Fragment>
      )
    }

    const trigger = (
      <Button id="skill-edit-skill" btnStyle="link">
        <Tip text={__('Edit')} placement="bottom">
          <Icon icon="edit-3" />
        </Tip>
      </Button>
    );

    return (
      <ModalTrigger
        title="Edit skill"
        trigger={trigger}
        content={renderContent()}
      />
    );
  }


  renderTab() {
    
    const renderContent = () => {
      return (
        <React.Fragment></React.Fragment>
      )
    }

    const trigger = (
      <Button id="skill-edit-skill" btnStyle="link">
        <Tip text={__('Edit')} placement="bottom">
          <Icon icon="edit-3" />
        </Tip>
      </Button>
    );
    

    const { currentTab } = this.state
    if (currentTab === 'a') {
      const content = (<a>sdfsdfs</a>)
      return (
        <Table>
          <thead>
            <tr>
              <th>{__('Created date')}</th>
              <th>{__('organization')}</th>
              <th>{__('Created by')}</th>
              <th>{__('Actions')}</th>
              <th style={{ width: 80 }} />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <i>12 Oct 2021</i>
              </td>
              <td>
                {__('--')}
              </td>
              <td>
                <i>B bat</i>
              </td>
              <td>
                <ActionButtons>
                  <ModalTrigger
                    title="Edit report"
                    trigger={trigger}
                    content={renderContent}
                  />
                  <Tip text={__('Delete')} placement="top">
                    <Button btnStyle="link">
                      <Icon icon="times-circle" />
                    </Button>
                  </Tip>
                </ActionButtons>
              </td>

              <td style={{ width: 80 }} />
            </tr>
          </tbody>
        </Table>)
    }
    
    return (
      <Table>
        <thead>
          <tr>
            <th>{__('Created date')}</th>
            <th>{__('organization')}</th>
            <th>{__('Created by')}</th>
            <th>{__('Actions')}</th>
            <th style={{ width: 80 }} />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <i>24 Oct 2021</i>
            </td>
            <td>
              {__('Tawan bogd')}
            </td>
            <td>
              <i>B bold</i>
            </td>
            <td>
              <ActionButtons>
                <Button btnStyle="link" onclick={this.renderEdit()}>
                  <Tip text={__('Edit')} placement="bottom">
                    <Icon icon="edit-3" />
                  </Tip>
                </Button>
                <Tip text={__('Delete')} placement="top">
                  <Button btnStyle="link">
                    <Icon icon="times-circle" />
                  </Button>
                </Tip>
              </ActionButtons>
            </td>

            <td style={{ width: 80 }} />
          </tr>
        </tbody>
      </Table>
    )
  }

  renderBoard() {
    const { currentTab } = this.state
    const tabOnClick = (name: string) => {
      console.log("taaabname", name)
      this.onChange('currentTab', name)
    }
    console.log("su")
    return (
      <React.Fragment>
        <Tabs full={true}>
          <TabTitle
            className={currentTab === 'Борлуулалтын мэдээлэл нэмэх' ? 'active' : ''}
            onClick={tabOnClick.bind(this, 'a')}
          >
            {__('Борлуулалтын мэдээллийн тайлан')}
          </TabTitle>
          <TabTitle
            className={currentTab === 'Нөөц үлдэгдэл нэмэх' ? 'active' : ''}
            onClick={tabOnClick.bind(this, 'b')}
          >
            {__('Нөөц үлдэгдлийн тайлан')}
          </TabTitle>
        </Tabs>
        {this.renderTab()}
      </React.Fragment>

    )
  }

  renderButton() {
    const trigger = (
      <Button
        btnStyle="success"
        type='button'
        icon='check-circle'
        uppercase={false} 
      >
        Add Report
      </Button>
    )
    const content = () => {
      return (<React.Fragment></React.Fragment>)
    }
    return (<>
      <ModalTrigger
        title="Тайлан нэмэх"
        autoOpenKey="showKBAddModal"
        trigger={trigger}
        content={content}
        enforceFocus={false}
      />
    </>)
  }
  renderSidebar() {
    return (<LeftSidebar full={true} header={<SidebarHeader />}>
      <LeftSidebar.header uppercase={true}>
        {__('Report type')}
      </LeftSidebar.header>
      <SidebarList>
        <li>
          <NavLink activeClassName='active' to={'/xaslisingfilter/a'}>
            {__('Борлуулалтын мэдээлэл')}
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to={'/xaslisingfilter/b'}>
            {__('Нөөц үлдэгдэл нэмэх')}
          </NavLink>
        </li>
      </SidebarList>
    </LeftSidebar>)
  }
  render() {
    const actionButton = (
      <FlexRow>
        <Sidebar full={true} wide={true} header={this.renderButton()}></Sidebar>
      </FlexRow>
    )
    return (
      <Wrapper
        header={
          <Wrapper.Header
            title={__('xas Lising report')}
            breadcrumb={
              [{ title: __('Settings'), link: '/settings' },
              { title: __('Xas Lising') }]}
          />
        }
        content={this.renderBoard()}
        actionBar={
          <Wrapper.ActionBar
            // left={ }
            right={actionButton}
          />
        }
      // leftSidebar={<LeftSidebar>
      //   <SidebarHeader>
      //     {__('xas Lising report')}
      //   </SidebarHeader>
      //   <SidebarList>
      //     <li>
      //       <NavLink activeClassName='active' to={'/erxes-plugin-khaslising/settings'}>
      //         {__('Борлуулалтын мэдээлэл')}
      //       </NavLink>
      //     </li>
      //     <li>
      //       <NavLink activeClassName='active' to={'/erxes-plugin-khaslising/settings'}>
      //         {__('Нөөц үлдэгдэл')}
      //       </NavLink>
      //     </li>
      //     <Button>asdasfs</Button>
      //   </SidebarList>
      // </LeftSidebar>}
      >

      </Wrapper >);
  }
}
export default XaslisingBoard