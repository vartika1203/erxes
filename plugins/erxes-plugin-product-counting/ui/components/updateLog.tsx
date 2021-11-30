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
// import Sidebar from 'erxes-ui/lib/layout/components/Sidebar';
import Sidebar from 'modules/layout/components/Sidebar';
import { Tabs, TabTitle } from 'modules/common/components/tabs'
import ModalTrigger from 'modules/common/components/ModalTrigger';
import Dropdown from 'react-bootstrap/Dropdown';
import EmptyState from 'modules/common/components/EmptyState';
import Icon from 'modules/common/components/Icon';
import DropdownToggle from 'modules/common/components/DropdownToggle';
import { ModalFooter } from 'modules/common/styles/main';
import { FlexRow } from '../styles';
import Select from 'react-select-plus';
// import toggleCheckBoxes from 'erxes-ui/lib//utils/toggleCheckBoxes';

// import Table from 
type Props = {

}

type State = {
  currentTab: string
}
class ProductCountingLog extends React.Component<Props, State>{

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'Branch'
    }
  }

  onChange = (name: string, value: string) => {
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
              <ControlLabel>Remainder import (xlsx, csv)
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
            <FormGroup>
              <ControlLabel>Product
              </ControlLabel>
              <FormControl
                name="remainder"
                placeholder="Category"
              >
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>
              </ControlLabel>
              <FormControl
                name="remainder"
                placeholder="Product"
              >
              </FormControl>
            </FormGroup>
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
              <Select></Select>
            </FormGroup>
          </FlexRow>
          <FlexRow>
            <ControlLabel>Хороолол салбар
            </ControlLabel>
            <ControlLabel>2
            </ControlLabel>
            <Select></Select>
          </FlexRow>
          <FlexRow>
            <ControlLabel>Хүүхдийн 100 салбар
            </ControlLabel>
            <ControlLabel>2
            </ControlLabel>
            <Select></Select>
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
              {__('Branch')}
            </TabTitle>
            <TabTitle
              className={currentTab === 'Product' ? 'active' : ''}
              onClick={tabOnClick.bind(this, 'Product')}
            >
              {__('Product')}
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

  renderCreateDoc() {

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
      const mimeTypeOptions = [
        { label: 'Name', value: 'sq' },
        { label: 'Unit Price', value: 'ar' },
        { label: 'SKU', value: 'bn' },
        { label: 'Code', value: 'bg' },
        { label: 'Vendor', value: 'zh_CN' },
        { label: 'Featured Image', value: 'cs' },
        { label: 'Description', value: 'nl' },
      ];


      return (<React.Fragment>
        <FormGroup>
          <FormGroup>
            <ControlLabel>Name
            </ControlLabel>
            <FormControl
              name="remainder"

              placeholder="Name.."
            >
            </FormControl>
          </FormGroup>
          <FormGroup>
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
                value='sdsdfsdf'
                options={mimeTypeOptions}
                // onChange={this.onChangeMultiCombo.bind(this, 'UPLOAD_FILE_TYPES')}
                multi={true}
                delimiter=","
                simpleValue={true}
              />
            </FormGroup>
            <FlexRow>
              <FormGroup>
                <ControlLabel>Layout
                </ControlLabel>
                <Select
                  placeholder="Vertical"
                >
                </Select>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Columns
                </ControlLabel>
                <FormControl
                  name="remainder"

                  placeholder=""
                >
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Rows
                </ControlLabel>
                <FormControl
                  name="remainder"

                  placeholder=""
                >
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Margin
                </ControlLabel>
                <FormControl
                  name="remainder"

                  placeholder=""
                >
                </FormControl>
              </FormGroup>
            </FlexRow>
            <FlexRow>
              <FormGroup>
                <ControlLabel>Width
                </ControlLabel>
                <FormControl
                  name="remainder"

                  placeholder=""
                >
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Height
                </ControlLabel>
                <FormControl
                  name="remainder"

                  placeholder=""
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
                  componentClass="checkbox"
                />
              </FormGroup>
            </FlexRow>
          </FormGroup>
        </FormGroup>
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
      />
    )
  }
}
export default ProductCountingLog