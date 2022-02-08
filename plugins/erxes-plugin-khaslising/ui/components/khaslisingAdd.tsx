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

import { Tabs, TabTitle } from 'modules/common/components/tabs'
import { ModalFooter } from 'modules/common/styles/main';
import Sidebar from 'modules/layout/components/Sidebar';

import {
  Wrapper, Alert
} from 'erxes-ui';

import {
  ColorPick,
  ColorPicker,
  ExpandWrapper,
  MarkdownWrapper
} from 'modules/settings/styles';
import Select from 'react-select-plus';

type Props = {}
type State = { currentTab: string }
class XasLising extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      currentTab: 'Борлуулалтын мэдээлэл нэмэх'
    }
  }

  renderContent() {
    
  }
  renderTab() {
    console.log("ggggggg", this.state.currentTab)
    if (this.state.currentTab === 'Борлуулалтын мэдээлэл нэмэх') {
      return (
        <>
          <ControlLabel>
          </ControlLabel>
          <FlexRow>
            <FormGroup>
              <ControlLabel>Нийлүүлэгч байгуулага
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
              <ControlLabel>Бэлэн Борлуулалт
              </ControlLabel>
              <FormControl
                type="number"
                name="remainder"
                placeholder=""
              >
              </FormControl>
            </FormGroup>

          </FlexRow>
          <FlexRow>
            <ExpandWrapper>
              <FormGroup>
                <ControlLabel>Өөрсдийн зээлээр <br />өгсөн Борлуулалт
                </ControlLabel>
                <FormControl
                  type="number"
                  name="remainder"
                >
                </FormControl>
              </FormGroup>
            </ExpandWrapper>
          </FlexRow>
          <FormGroup>
            <ControlLabel>Банк санхүүгийн байгууллагаар борлуулсан борлуулалт ширхэгээр
            </ControlLabel>
          </FormGroup>
          <FlexRow>
            <FormGroup>
              <ControlLabel>Khaan Bank
              </ControlLabel>
              <FormControl
                type="number"
                name="remainder"
                placeholder=""
              >
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>TDB
              </ControlLabel>
              <FormControl
                type="number"
                name="remainder"
                placeholder=""
              >
              </FormControl>
            </FormGroup>
          </FlexRow>

          <FlexRow>
            <FormGroup>
              <ControlLabel>Golomt
              </ControlLabel>
              <FormControl
                type="number"
                name="remainder"
                placeholder=""
              >
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>XasBank
              </ControlLabel>
              <FormControl
                type="number"
                name="remainder"
                placeholder=""
              >
              </FormControl>
            </FormGroup>
          </FlexRow>
          <FlexRow>
            <FormGroup>
              <ControlLabel>other
              </ControlLabel>
              <FormControl
                type="number"
                name="remainder"
                placeholder=""
              >
              </FormControl>
            </FormGroup>
          </FlexRow>
          <FormGroup>
            <ControlLabel>Нийт борлуулалт
            </ControlLabel>
          </FormGroup>
          <FlexRow>
            <FormGroup>
              <ControlLabel>Тоо ширхэг
              </ControlLabel>
              <FormControl
                type="number"
                name="remainder"
                placeholder=""
              >
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Дүнгээр
              </ControlLabel>
              <FormControl
                type="number"
                name="remainder"
                placeholder=""
              >
              </FormControl>
            </FormGroup>
          </FlexRow>
        </>

      )
    }
    return (
      <>
        <ControlLabel>
        </ControlLabel>
        <FlexRow>
          <FormGroup>
            <ControlLabel>Нийлүүлэгч байгуулага
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
            <ControlLabel>Хөрөнгө
            </ControlLabel>
            <FormControl
              componentClass="select"
              name="remainder"
              placeholder=""
            >
              <option >
                {__('No selected file')}
              </option>
            </FormControl>
          </FormGroup>

        </FlexRow>
        <FlexRow>
          <FormGroup>
            <ControlLabel>Эхний үлдэгдэл
            </ControlLabel>
            <FormControl
              type="number"
              name="remainder"
              placeholder=""
            >
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Захиалгат
            </ControlLabel>
            <FormControl
              type="number"
              name="remainder"
              placeholder=""
            >
            </FormControl>
          </FormGroup>
        </FlexRow>

        <FlexRow>
          <FormGroup>
            <ControlLabel>Захиалаагүй
            </ControlLabel>
            <FormControl
              type="number"
              name="remainder"
              placeholder=""
            >
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Татан авалт
            </ControlLabel>
            <FormControl
              type="number"
              name="remainder"
              placeholder=""
            >
            </FormControl>
          </FormGroup>
        </FlexRow>
        <FlexRow>
          <FormGroup>
            <ControlLabel>Эцсийн үлдэгдэл
            </ControlLabel>
            <FormControl
              type="number"
              name="remainder"
              placeholder=""
            >
            </FormControl>
          </FormGroup>
        </FlexRow>
      </>

    )

  }
  onChange = (name: string, value: any) => {
    this.setState({ [name]: value } as any)
  };
  render() {
    const { currentTab } = this.state
    const actionButton = () => {
      // return ()
    }
    const tabOnClick = (name: string) => {
      console.log("taaabname", name)
      this.onChange('currentTab', name)
    }
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
    return (
        <FullContent center={true} align={true}>
          <MiddleContent transparent={true}>
            <StatusBox largePadding={true}>
              <StatusTitle>{__('Xas Lising')}</StatusTitle>

              <Tabs full={true}>
                <TabTitle
                  className={currentTab === 'Борлуулалтын мэдээлэл нэмэх' ? 'active' : ''}
                  onClick={tabOnClick.bind(this, 'Борлуулалтын мэдээлэл нэмэх')}
                >
                  {__('Борлуулалтын мэдээлэл нэмэх')}
                </TabTitle>
                <TabTitle
                  className={currentTab === 'Нөөц үлдэгдэл нэмэх' ? 'active' : ''}
                  onClick={tabOnClick.bind(this, 'Нөөц үлдэгдэл нэмэх')}
                >
                  {__('Нөөц үлдэгдэл нэмэх')}
                </TabTitle>
              </Tabs>
              {this.renderTab()}
              <ModalFooter>
                {cancel}{save}
              </ModalFooter>
            </StatusBox>
          </MiddleContent>

        </FullContent>
    )
  }
}
export default XasLising