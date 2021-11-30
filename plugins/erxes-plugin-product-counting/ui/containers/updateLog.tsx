import React from 'react';
// import { Link } from 'react-router-dom';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Icon from 'modules/common/components/Icon';
// import EmptyState from 'modules/common/components/EmptyState';
// import DropdownToggle from 'modules/common/components/DropdownToggle';
// import { BarItems as BarItemsCommon } from 'modules/layout/styles';
// import Table from 'modules/common/components/table';
// import ActionButtons from 'modules/common/components/ActionButtons';
// // import KnowledgeForm from 'modules/common/components/KnowledgeForm';
// // import Form from 'modules/common/components/form/Form';
// // import Tip from 'modules/common/components/Tip';
// import ModalTrigger from 'modules/common/components/ModalTrigger';
// import Sidebar from 'modules/layout/components/Sidebar';
// // import FormGroup from 'modules/common/components/form/Group';
// // import ControlLabel from 'modules/common/components/form/Label';
// // import FormControl from 'modules/common/components/form/Control';
// import { Tabs, TabTitle } from 'modules/common/components/tabs';
// import SelectBrand from 'modules/settings/integrations/containers/SelectBrand';
// import { FullContent, MiddleContent } from '../../../../ui/src/modules/common/styles/main'
// import {
  // Wrapper,
  // __,
  // Button,
  // FormGroup,
  // ControlLabel,
  // FormControl,
  // AvatarUpload,
  // Tip,
  // Icon,
// } from 'erxes-ui';
// import { TabContent, Row, FlexRow, ContainerFragment } from '../styles';
import ProductCountingLog from '../components/updateLog'

type State = {
  currentTab: string
}
class UpdateLog extends React.Component<State>{
  // state: { currentTab: string; };

  constructor(props) {
    super(props)
    this.state = {
      currentTab: 'Branch'
    }
  }

  // add_product = () => {

  //   return 0
  // }
  // onChange = (name: string, value: string) => {
  //   this.setState({ [name]: value })
  // };

  // renderTabContent() {
  //   if (this.state.currentTab === 'Branch') {
  //     return (

        // // <TabContent>
        // <FormGroup>

        //   <ControlLabel>
        //   </ControlLabel>
        //   <FlexRow>
        //     <FormGroup>
        //       <ControlLabel>Remainder import (xlsx, csv)
        //       </ControlLabel>
        //       <FormControl
        //         name="remainder"
        //         componentClass="select"
        //       >
        //         <option >
        //           {/* {brands.map(brand => (
        //       <option key={brand._id} value={brand._id}>
        //         {brand.name} */}
        //         </option>
        //         {/* <Button>dfsdf</Button> */}
        //       </FormControl>
        //     </FormGroup>
        //     <FormGroup>
        //       <Button btnStyle="primary" icon="plus-circle">
        //         Choose
        //       </Button>
        //     </FormGroup>
        //   </FlexRow>
        //   <FlexRow>
        //     <FormGroup>
        //       <ControlLabel>Product
        //       </ControlLabel>
        //       <FormControl
        //         name="remainder"
        //         placeholder="Category"
        //       >
        //       </FormControl>
        //     </FormGroup>
        //     <FormGroup>
        //       <ControlLabel>
        //       </ControlLabel>
        //       <FormControl
        //         name="remainder"
        //         placeholder="Product"
        //       >
        //       </FormControl>
        //     </FormGroup>
        //   </FlexRow>
        //   <FormGroup>
        //     <ControlLabel>Description
        //     </ControlLabel>
        //     <FormControl
        //       name="remainder"
        //       placeholder="Description text"
        //     >
        //     </FormControl>
        //   </FormGroup>
        //   <FlexRow>
        //     <ControlLabel>Branch
        //     </ControlLabel><ControlLabel>Product count
        //     </ControlLabel><ControlLabel>Change count
        //     </ControlLabel>
        //   </FlexRow>
        // </FormGroup>

  //     )
  //   }
    // return (

    //   // <TabContent>
    //   <FormGroup>
    //     <ControlLabel>
    //     </ControlLabel>
    //     <FlexRow>
    //       <FormGroup>
    //         <ControlLabel>Remainder import (xlsx, csv)
    //         </ControlLabel>
    //         <FormControl
    //           name="remainder"
    //           componentClass="select"
    //           placeholder="No selected file"
    //         >
    //           <option >
    //             {/* {brands.map(brand => (
    //         <option key={brand._id} value={brand._id}>
    //           {brand.name} */}
    //           </option>
    //           {/* <Button>dfsdf</Button> */}
    //         </FormControl>
    //       </FormGroup>
    //       <FormGroup>
    //         <Button btnStyle="primary" icon="plus-circle">
    //           Choose
    //         </Button>
    //       </FormGroup>
    //     </FlexRow>
    //     <FlexRow>
    //       <FormGroup>
    //         <ControlLabel>Branch
    //         </ControlLabel>
    //         <FormControl
    //           name="remainder"

    //           placeholder="Choose one"
    //         >
    //         </FormControl>
    //       </FormGroup>
    //       <FormGroup>
    //         <ControlLabel>
    //           Remainder
    //         </ControlLabel><br />
    //         <Button btnStyle="primary" icon="import">
    //           Choose
    //         </Button>
    //       </FormGroup>
    //     </FlexRow>
    //     <FormGroup>
    //       <ControlLabel>Description
    //       </ControlLabel>
    //       <FormControl
    //         name="remainder"

    //         placeholder="Description text..."
    //       >
    //       </FormControl>
    //     </FormGroup>
    //     <FlexRow>
    //       <ControlLabel>Product
    //       </ControlLabel>
    //       <ControlLabel>Before Product <br /> count
    //       </ControlLabel>
    //       <ControlLabel>Change
    //         count
    //       </ControlLabel>
    //       <ControlLabel>After Product <br />count
    //       </ControlLabel>
    //     </FlexRow>
    //   </FormGroup>

    // )
  // }
  // renderAddProduct() {
  //   const trigger = (
  //     <Button
  //       btnStyle="primary"
  //       icon="plus-circle"
  //       uppercase={false}
  //     >
  //       Add product label
  //     </Button>
  //   )
  //   const { currentTab } = this.state
  //   const tabOnClick = (name: string) => {
  //     this.onChange('currentTab', name);
  //   };
  //   const content = () => (

  //     <ContainerFragment null>
  //       <Tabs full={true}>
  //         <TabTitle
  //           className={currentTab === 'Branch' ? 'active' : ''}
  //           onClick={tabOnClick.bind(this, 'Branch')}>
  //           {__('Branch')}
  //         </TabTitle>
  //         <TabTitle
  //           className={currentTab === 'Product' ? 'active' : ''}
  //           onClick={tabOnClick.bind(this, 'Product')}>
  //           {__('Product')}
  //         </TabTitle>
  //       </Tabs>
  //       {this.renderTabContent()}
  //     </ContainerFragment>

  //   );
  //   return (
  //     <ModalTrigger
  //       title="Үлдэгдэл засах"
  //       autoOpenKey="showKBAddModal"
  //       trigger={trigger}
  //       content={content}
  //       enforceFocus={false}
  //     />
  //   )
  // }
  render() {
    // const dropdown = (
    //   <BarItemsCommon >
    //     <Dropdown>
    //       <Dropdown.Toggle as={DropdownToggle} id="dropdown-board">
    //         {/* <HeaderButton rightIconed={true}> */}
    //         {__('Update date')}
    //         <Icon icon="angle-down" />
    //         {/* </HeaderButton> */}
    //       </Dropdown.Toggle>
    //       <Dropdown.Menu>
    //         <EmptyState icon="web-grid-alt" text="No other boards" size="small" />
    //       </Dropdown.Menu>
    //     </Dropdown>
    //     <Dropdown>
    //       <Dropdown.Toggle as={DropdownToggle} id="dropdown-board">
    //         {/* <HeaderButton rightIconed={true}> */}
    //         {__('Created by')}
    //         <Icon icon="angle-down" />
    //         {/* </HeaderButton> */}
    //       </Dropdown.Toggle>
    //       <Dropdown.Menu>
    //         <EmptyState icon="web-grid-alt" text="No other boards" size="small" />
    //       </Dropdown.Menu>
    //     </Dropdown>
    //     <Dropdown>
    //       <Dropdown.Toggle as={DropdownToggle} id="dropdown-board">
    //         {/* <HeaderButton rightIconed={true}> */}
    //         {__('Type')}
    //         <Icon icon="angle-down" />
    //         {/* </HeaderButton> */}
    //       </Dropdown.Toggle>
    //       <Dropdown.Menu>
    //         <EmptyState icon="web-grid-alt" text="No other boards" size="small" />
    //       </Dropdown.Menu>
    //     </Dropdown>
    //   </BarItemsCommon >
    // );
    // const breadcrumb = [
    //   { title: __('Settings'), link: '/settings' },
    //   { title: __('Product Counting') }
    // ];
    // const actionButtons = (

    //   <Sidebar full={true} wide={true} header={this.renderAddProduct()}>
    //   </Sidebar>

    // );
    // const table = (
    //   <Table>
    //     <thead>
    //       <tr>
    //         <th>{__('Update date')}</th>
    //         <th>{__('Description')}</th>
    //         <th>{__('Type')}</th>
    //         <th>{__('Created by')}</th>
    //         <th style={{ width: 80 }} />
    //       </tr>
    //     </thead>
    //     <tbody id={'SegmentShowing'}>

    //       <tr>
    //         <td>
    //           <i class="icon-calender" icon="calender" color="" >12 Oct 2021</i>
    //         </td>
    //         <td>
    //           {__('Baraanii too shirheg zursun bn')}
    //         </td>
    //         <td>
    //           {__('Branch')}
    //         </td>
    //         <td>
    //           <i color="" >B Myagmarsuren</i>

    //         </td>
    //         <ActionButtons>
    //           <Tip text={__('Edit')} placement="top">
    //             <Link to={``}>
    //               <Button btnStyle="link" icon="edit-3" />
    //             </Link>
    //           </Tip>
    //           <Tip text={__('Delete')} placement="top">
    //             <Button btnStyle="link" icon="times-circle" />
    //           </Tip>
    //         </ActionButtons>
    //         <td style={{ width: 80 }} />
    //       </tr>

    //     </tbody>

    //   </Table>
    // )
    return (
      // <Wrapper
      //   header={
      //     <Wrapper.Header
      //       title={__('Product Counting')}
      //       breadcrumb={breadcrumb}
      //     />
      //   }
      //   content={table}
      //   actionBar={
      //     <Wrapper.ActionBar
      //       left={dropdown}
      //       right={actionButtons}
      //     />
      //   }
      // // center={true}
      // />
      <ProductCountingLog/>
    )
  }
}
export default UpdateLog