import React from 'react';
import { BarItems as BarItemsCommon } from '../../../../ui/node_modules/erxes-ui/lib';
import {
  Wrapper,
  __,
  Table,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from 'erxes-ui'
import Sidebar from '../../../../ui/src/modules/layout/components/Sidebar';
import { Tabs, TabTitle } from '../../../../ui/src/modules/common/components/tabs'
import ModalTrigger from '../../../../ui/src/modules/common/components/ModalTrigger';
import Dropdown from 'react-bootstrap/Dropdown';
import EmptyState from '../../../../ui/src/modules/common/components/EmptyState';
import Icon from '../../../../ui/src/modules/common/components/Icon';
import DropdownToggle from '../../../../ui/src/modules/common/components/DropdownToggle';
import { ModalFooter } from '../../../../ui/src/modules/common/styles/main';
import { FlexRow, Shoshgo } from '../styles';
import Select from 'react-select-plus';
import {
  ColorPick,
  ColorPicker,
  ExpandWrapper,
  MarkdownWrapper
} from '../../../../ui/src/modules/settings/styles';
import { IConfigsMap } from '../types'
// import toggleCheckBoxes from 'erxes-ui/lib//utils/toggleCheckBoxes';

// import Table from 
type Props = {
  configsMap: IConfigsMap;
}

type State = {
  currentTab: string
  name: string
  description: string
  rows: number
  columns: number
  width: number
  height: number
  margin: number
  qr: boolean
  barcode: boolean
  configsMap: IConfigsMap
}
class ProductCountingLog extends React.Component<Props, State>{

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'Branch',
      name: '',
      description: '',
      rows: 3,
      columns: 3,
      width: 400,
      height: 150,
      margin: 0,
      qr: true,
      barcode: true,
      configsMap: [
        { label: 'Name', value: 'sq' },
        { label: 'Unit Price', value: 'ar' },
        { label: 'SKU', value: 'bn' },
        { label: 'Code', value: 'bg' },
        { label: 'Vendor', value: 'zh_CN' },
        { label: 'Featured Image', value: 'cs' },
        { label: 'Description', value: 'nl' },
      ]
    }
  }

  onChange = (name: string, value: any) => {
    this.setState({ [name]: value } as any)
  };

  renderFilter() {
    return (
      <BarItemsCommon >
        <Dropdown>
          <Dropdown.Toggle as={DropdownToggle} id="dropdown-board">
            {/* <HeaderButton rightIconed={true}> */}
            {__('Update date')}
            <Icon icon="angle-down" />
            {/* </HeaderButton> */}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <EmptyState icon="web-grid-alt" text="No other boards" size="small" />
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle as={DropdownToggle} id="dropdown-board">
            {/* <HeaderButton rightIconed={true}> */}
            {__('Created by')}
            <Icon icon="angle-down" />
            {/* </HeaderButton> */}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <EmptyState icon="web-grid-alt" text="No other boards" size="small" />
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle as={DropdownToggle} id="dropdown-board">
            {/* <HeaderButton rightIconed={true}> */}
            {__('Type')}
            <Icon icon="angle-down" />
            {/* </HeaderButton> */}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <EmptyState icon="web-grid-alt" text="No other boards" size="small" />
          </Dropdown.Menu>
        </Dropdown>
      </BarItemsCommon >
    )
  }

  renderTabs() {

    if (this.state.currentTab === 'Branch') {
      return (
        <FormGroup>
          <ControlLabel>
          </ControlLabel>
          <FlexRow>
            <FormGroup>
              <ControlLabel>Борлуулалтын мэдээлэл нэмэх
              </ControlLabel>
              <FormControl
                name="remainder"
                componentClass="select"
              >
                <option >
                  {__('No selected file')}
                </option>
                {/* <Button>dfsdf</Button> */}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <br />
              <Button btnStyle="primary" icon="plus-circle">
                Choose
              </Button>
            </FormGroup>
          </FlexRow>
          <FlexRow>
            <ExpandWrapper>
              <FormGroup>
                <ControlLabel>Product
                </ControlLabel>
                <Select
                  clearable={false}
                  placeholder="Category"
                ></Select>
              </FormGroup>
            </ExpandWrapper>
            <ExpandWrapper>
              <FormGroup>
                <ControlLabel>
                </ControlLabel>
                <Select
                  placeholder="Product"
                  clearable={false}
                ></Select>
              </FormGroup>
            </ExpandWrapper>

          </FlexRow>
          <FormGroup>
            <ControlLabel>Description
            </ControlLabel>
            <FormControl
              name="remainder"
              placeholder="Description text"
            >
            </FormControl>
          </FormGroup>
          <FlexRow>
            <ControlLabel>Structure Branch
            </ControlLabel>
            <ControlLabel>4
            </ControlLabel>
            <FormGroup>
              <FormControl
                defaultValue={0}
                type={'number'}
                onChange={this.onChange.bind(this, 'Branch')}
                required={true}
              />
            </FormGroup>
          </FlexRow>
          <FlexRow>
            <ControlLabel>Хороолол салбар
            </ControlLabel>
            <ControlLabel>2
            </ControlLabel>
            <FormGroup>
              <FormControl
                defaultValue={0}
                type={'number'}
                onChange={this.onChange.bind(this, 'Branch')}
                required={true}
              />
            </FormGroup>
          </FlexRow>
          <FlexRow>
            <ControlLabel>Хүүхдийн 100 салбар
            </ControlLabel>
            <ControlLabel>2
            </ControlLabel>
            <FormGroup>
              <FormControl
                defaultValue={0}
                type={'number'}
                onChange={this.onChange.bind(this, 'Branch')}
                required={true}
              />
            </FormGroup>
          </FlexRow>
        </FormGroup>

      )
    }

    return (

      // <TabContent>
      <FormGroup>
        <ControlLabel>
        </ControlLabel>
        <FlexRow>
          <FormGroup>
            <ControlLabel>Remainder import (xlsx, csv)
            </ControlLabel>
            <FormControl
              name="remainder"
              disabled={true}
              placeholder="No selected file"
            >
              <option >
                {/* {brands.map(brand => (
            <option key={brand._id} value={brand._id}>
              {brand.name} */}
              </option>
              {/* <Button>dfsdf</Button> */}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <br />
            <Button btnStyle="primary" icon="import">
              Choose file
            </Button>
          </FormGroup>
        </FlexRow>
        <FlexRow>
          <FormGroup>
            <ControlLabel>Branch
            </ControlLabel>
            <Select
              placeholder="Choose one"
            >
            </Select>
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              Remainder
            </ControlLabel><br />
            <Button btnStyle="primary" icon="export">
              Export file
            </Button>
          </FormGroup>
        </FlexRow>
        <FormGroup>
          <ControlLabel>Description
          </ControlLabel>
          <FormControl
            name="remainder"

            placeholder="Description text..."
          >
          </FormControl>
        </FormGroup>
        <FlexRow>
          <ControlLabel>Product
          </ControlLabel>
          <ControlLabel>Before Product <br /> count
          </ControlLabel>
          <ControlLabel>Change
            count
          </ControlLabel>
          <ControlLabel>After Product <br />count
          </ControlLabel>
        </FlexRow>
      </FormGroup>

    )
  }

  renderButtons() {
    const { currentTab } = this.state

    const tabOnClick = (name: string) => {
      this.onChange('currentTab', name)
    }

    const trigger = (
      <Button
        btnStyle="primary"
        icon="plus-circle"
        uppercase={false}
      >
        Remainder change
      </Button>
    )
    const cancel = (
      <Button
        btnStyle="simple"
        type="button"
        // onClick={''}
        icon="times-circle"
        uppercase={false}
      >
        Cancel
      </Button>
    )
    const save = (
      <Button
        btnStyle="success"
        type="button"
        // onClick={''}
        icon="check-circle"
        uppercase={false}
      >
        Save
      </Button>
    )
    const content = () => {
      return (
        <React.Fragment>
          <Tabs full={true}>
            <TabTitle
              className={currentTab === 'Branch' ? 'active' : ''}
              onClick={tabOnClick.bind(this, 'Branch')}
            >
              {__('Борлуулалтын мэдээлэл нэмэх')}
            </TabTitle>
            <TabTitle
              className={currentTab === 'Product' ? 'active' : ''}
              onClick={tabOnClick.bind(this, 'Product')}
            >
              {__('Нөөц үлдэгдэл нэмэх')}
            </TabTitle>
          </Tabs>
          {this.renderTabs()}
          <ModalFooter>{
            cancel}{save}
          </ModalFooter>
        </React.Fragment>
      )
    }

    return (<>
      <ModalTrigger
        title="Үлдэгдэл засах"
        autoOpenKey="showKBAddModal"
        trigger={trigger}
        content={content}
        enforceFocus={false}
      />
    </>
    )
  }

  renderLogs() {
    return (
      <Table>
        <thead>
          <tr>
            <th>{__('Update date')}</th>
            <th>{__('Description')}</th>
            <th>{__('Type')}</th>
            <th>{__('Created by')}</th>
            <th style={{ width: 80 }} />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <i>12 Oct 2021</i>
            </td>
            <td>
              {__('Baraaanii oorchlolt')}
            </td>
            <td>
              {__('Branch')}
            </td>
            <td>
              <i>B Mygmarsuren</i>
            </td>

            <td style={{ width: 80 }} />
          </tr>
        </tbody>
      </Table>
    )
  }

  renderShoshgo() {
    const count = ['Name', 'Unit Price', 'SKU', 'Code', 'Vendor', 'Featured image', 'Description'];
    const { columns } = this.state
    const renderCount = (e, a) => {
      let row
      var table = ''
      switch (e) {
        case 1:
          row = 7
          break;
        case 2:
          row = 4
          break;
        case 3:
          row = 3
          break;
        case 7:
          row = 1
          break;
        default:
          row = 2
          break;
      }
      var i = 0
      // console.log("sssssssssss", i);
      console.log("s", a);
      console.log("column", e);
      console.log("urt", a.length);
      while (i < a.length) {
        table = table.concat('<tr>');
        console.log("table", table);
        for (var k = 0; k < row; k++) {
          if (a[i])
            table = table.concat(('<td>' + a[i] + '</td>'))
          i++
        }
        table = table.concat('</tr>')
      }
      console.log('table', table)
      var dom = <tbody dangerouslySetInnerHTML={{ __html: table }}></tbody>

      return dom

    }
    return (
      <Shoshgo height={this.state.height} width={this.state.width} margin={this.state.margin}>
        <Table>
          {renderCount(columns, count)}
        </Table>
      </Shoshgo>
    )
  }

  onChangeConfig = (code: string, value) => {
    const { configsMap } = this.state;

    configsMap[code] = value;

    this.setState({ configsMap });
  };

  onChangeMultiCombo = (code: string, values) => {
    let value = values;

    if (Array.isArray(values)) {
      value = values.map(el => el.value);
    }
    if (!value || value.length === 0) {
      value = '';
    }
    this.onChangeConfig(code, value);
  };

  setConfigsMap(key) {
    const { rows } = this.state
    if (key > 7) {
      this.onChange('rows', 7)
    }
    //  if()
  }

  renderCreateDoc() {
    const { width, height } = this.state
    const trigger = (
      <Button
        btnStyle="primary"
        icon="change"
        uppercase={false}
      >
        Add Product Label
      </Button>
    )

    const cancel = (
      <Button
        btnStyle="simple"
        type="button"
        // onClick={''}
        icon="times-circle"
        uppercase={false}
      >
        Cancel
      </Button>
    )
    const save = (
      <Button
        btnStyle="success"
        type="button"
        // onClick={''}
        icon="check-circle"
        uppercase={false}
      >
        Save
      </Button>
    )

    const content = () => {

      const wtf = [
        { label: 'Naasdasdme', value: 'sq' },
        { label: 'Unasdasdit Price', value: 'ar' },
        { label: 'SKasdasdU', value: 'bn' },
        { label: 'Codasasdasddasde', value: 'bg' },
        { label: 'Veasdasdndor', value: 'zh_CaN' },
        { label: 'Featasdasdured Image', value: 'cas' },
        { label: 'Descasdasdription', value: 'nla' },
      ]
      const onChangeWidth = e => {
        let value: number = parseInt((e.target as HTMLInputElement).value)
        if (value > 430)
          onChangeInput('width', 430)
        else
          onChangeInput('width', value)

      }


      const onChangeHeight = e =>
        onChangeInput('height', (e.target as HTMLInputElement).value)

      const onChangeTable = (code: string, e) => {
        let value: number = parseInt((e.target as HTMLInputElement).value)
        let tmp1: string = 'columns'
        let tmp2: string = 'rows'
        if (code === "rows") {
          tmp1 = 'rows'
          tmp2 = 'columns'
        }
        switch (value) {
          case 1:
            onChangeInput(tmp1, 1);
            onChangeInput(tmp2, 7)
            break;
          case 2:
            onChangeInput(tmp1, 2);
            onChangeInput(tmp2, 4)
            break;
          case 3:
            onChangeInput(tmp1, 3);
            onChangeInput(tmp2, 3)
            break;
          case 4:
            onChangeInput(tmp1, 4);
            onChangeInput(tmp2, 2)
            break;
          case 5:
            onChangeInput(tmp1, 5);
            onChangeInput(tmp2, 2)
            break;
          case 6:
            onChangeInput(tmp1, 6);
            onChangeInput(tmp2, 2)
            break;
          case 7:
            onChangeInput(tmp1, 7);
            onChangeInput(tmp2, 1)
            break;
        }
      }

      const onChangeMargin = e => {
        let value: number = parseInt((e.target as HTMLInputElement).value)
        if (value > 100)
          onChangeInput('margin', 100)
        else
          onChangeInput('margin', value)
      }

      const onChangeInput = (name, value) => {
        this.setState({ [name]: value } as any);
        console.log("sdfsdfsfdgdfgdfg", this.state.margin)
      };
      const onChangeQr = (e) => {
        onChangeInput('barcode', e.target.value)
      }

      return (<React.Fragment>
        <FormGroup>
          <ControlLabel>Name
          </ControlLabel>
          <FormControl
            name="remainder"

            placeholder="Name.."
          >
          </FormControl>
        </FormGroup>
        <ControlLabel>Description
        </ControlLabel>
        <FormControl
          name="remainder"

          placeholder="Description text..."
        >
        </FormControl>
        <FormGroup>
          <ControlLabel>Display Field (Product Custom Property)</ControlLabel>
          <Select
            value={this.state.configsMap}
            options={wtf}
            onChange={this.onChangeMultiCombo.bind(this, 'sex_choices')}
            multi={true}
            delimiter=""
            simpleValue={true}
          />
        </FormGroup>
        <FlexRow>
          <FormGroup>
            <ExpandWrapper>
              <ControlLabel>Layout
              </ControlLabel>
              <FormControl
                componentClass='select'
                name="remainder"
                placeholder="Description text..."
              >
              </FormControl>
            </ExpandWrapper>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Columns
            </ControlLabel>
            <FormControl
              name="remainder"
              type="number"
              value={this.state.columns}
              onChange={(e) => onChangeTable('columns', e)}
              required={true}
            >
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Rows
            </ControlLabel>
            <FormControl
              name="remainder"
              type="number"
              value={this.state.rows}
              onChange={(e) => onChangeTable('rows', e)}
            >
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Margin
            </ControlLabel>
            <FormControl
              value={this.state.margin}
              name="remainder"
              type="number"
              placeholder=""
              onChange={onChangeMargin}
            >
            </FormControl>
          </FormGroup>
        </FlexRow>
        <FlexRow>
          <FormGroup>
            <ControlLabel>Width
            </ControlLabel>
            <FormControl
              value={this.state.width}
              name="remainder"
              type="number"
              onChange={onChangeWidth}
            >
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Height
            </ControlLabel>
            <FormControl
              onChange={onChangeHeight}
              name="remainder"
              type="number"
              placeholder=""
              value={this.state.height}
            >
            </FormControl>
          </FormGroup>
        </FlexRow>
        <FlexRow>
          <FormGroup>
            <ControlLabel>QR
            </ControlLabel>
            <FormControl
              componentClass="checkbox"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Barcode
            </ControlLabel>
            <FormControl
              checked={this.state.barcode}
              onChange={onChangeQr}
              componentClass="checkbox"

            />
          </FormGroup>
        </FlexRow>
        {this.renderShoshgo()}
        <ModalFooter>{
          cancel}{save}
        </ModalFooter>
      </React.Fragment>
      )
    }
    return (<>
      <ModalTrigger
        title="Үлдэгдэл засах"
        autoOpenKey="showKBAddModal"
        trigger={trigger}
        content={content}
        enforceFocus={false}
      />
    </>
    )
  }
  renderSidebar(){

  }
  render() {

    const actionButton = (
      <FlexRow>
        <Sidebar full={true} wide={true} header={this.renderCreateDoc()}></Sidebar>
        <Sidebar full={true} wide={true} header={this.renderButtons()}></Sidebar>
      </FlexRow>
    )
    // const breadcrumb = [
    //   { title: __('Settings'), link: '/settings' },
    //   { title: __('Product Counting') }
    // ];
    return (
      <Wrapper
        header={
          <Wrapper.Header
            title={__('Product Counting')}
          // breadcrumb={breadcrumb}
          />
        }
        content={this.renderLogs()}
        actionBar={
          <Wrapper.ActionBar
            left={this.renderFilter()}
            right={
              actionButton
            }
          />
        }
        leftSidebar= {''}
      />
    )
  }
}
export default ProductCountingLog