import React from 'react';

import Sidebar from '../../../../ui/src/modules/layout/components/Sidebar';
import Wrapper from '../../../../ui/src/modules/layout/components/Wrapper';
import { __ } from '../../../../ui/src/modules/common/utils';
import { SidebarList } from '../../../../ui/src/modules/layout/styles';
import DataWithLoader from '../../../../ui/src/modules/common/components/DataWithLoader';
import { ActionButtons, SidebarListItem } from '../../../../ui/src/modules/settings/styles';
import Button from '../../../../ui/src/modules/common/components/Button';
import Tip from '../../../../ui/src/modules/common/components/Tip';
import Icon from '../../../../ui/src/modules/common/components/Icon';
import ModalTrigger from '../../../../ui/src/modules/common/components/ModalTrigger';
import Box from '../../../../ui/src/modules/common/components/Box';
import { FlexRow } from '../styles';
import { ModalFooter } from '../../../../ui/src/modules/common/styles/main';
import {
  ColorPick,
  ColorPicker,
  ExpandWrapper,
  MarkdownWrapper
} from '../../../../ui/src/modules/settings/styles';
import Select from 'react-select-plus';
import {
  Table,
  FormGroup,
  ControlLabel,
  FormControl
} from 'erxes-ui'

import { Link } from 'react-router-dom';
import { FieldStyle } from 'erxes-ui';

const { Section } = Wrapper.Sidebar;


type Props = {
  save: (
    {
      title,
      zai,
      name,
      description,
      type,
      googleMapLink,
      schoolType,
      latitude,
      longitude,
      duureg,
      horoo,
      dulaan,
      tsahilgaan,
      hamgaalalt,
      cable,
      phoneNumber,
      hospital,
      busStop,
      pharmacy,
      walkingEnvironment,
      Playground,
      shop,
      outdoorParking,
      camera,
      walkingEnv,
      basketball,
      playground,
      greenPlant,
      streetLighting,
      typeAsNumber
    }: {
      title: string,
      name: string,
      description: string,
      type: string,
      googleMapLink: string,
      schoolType: string,
      latitude: number,
      longitude: number,
      duureg: string,
      horoo: string,
      dulaan: string,
      tsahilgaan: string,
      hamgaalalt: string,
      cable: string,
      phoneNumber: number,
      hospital: string,
      busStop: string,
      pharmacy: string,
      zai: number,
      walkingEnvironment: string,
      Playground: string,
      shop: string,
      outdoorParking: string,
      camera: number,
      walkingEnv: number,
      basketball: number,
      playground: number,
      greenPlant: number,
      streetLighting: number,
      typeAsNumber: number,
    },
    callback?: () => void
  ) => void;
}
type State = {
  title: string,
  name: string,
  description: string,
  type: string,
  googleMapLink: string,
  schoolType: string,
  latitude: number,
  longitude: number,
  duureg: string,
  horoo: string,
  dulaan: string,
  tsahilgaan: string,
  hamgaalalt: string,
  cable: string,
  phoneNumber: number,
  hospital: string,
  busStop: string,
  pharmacy: string,
  zai: number,
  walkingEnvironment: string,
  Playground: string,
  shop: string,
  outdoorParking: string,
  camera: number,
  walkingEnv: number,
  basketball: number,
  playground: number,
  greenPlant: number,
  streetLighting: number,
  typeAsNumber: number,
  isSaved: boolean;


}
class List extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      zai: null,
      name: '',
      description: '',
      type: '1',
      googleMapLink: '',
      schoolType: '',
      latitude: null,
      longitude: null,
      duureg: '',
      horoo: '',
      dulaan: '',
      tsahilgaan: '',
      hamgaalalt: '',
      cable: '',
      phoneNumber: null,
      hospital: '',
      busStop: '',
      pharmacy: '',
      walkingEnvironment: '',
      Playground: '',
      shop: '',
      outdoorParking: '',
      camera: null,
      walkingEnv: null,
      basketball: null,
      playground: null,
      greenPlant: null,
      streetLighting: null,
      typeAsNumber: 1,
      isSaved: false
    }
    this.save = this.save.bind(this);
  }
  save = () => {
    const { save } = this.props;

    const {
      title,
      zai,
      name,
      description,
      type,
      googleMapLink,
      schoolType,
      latitude,
      longitude,
      duureg,
      horoo,
      dulaan,
      tsahilgaan,
      hamgaalalt,
      cable,
      phoneNumber,
      hospital,
      busStop,
      pharmacy,
      walkingEnvironment,
      Playground,
      shop,
      outdoorParking,
      camera,
      walkingEnv,
      basketball,
      playground,
      greenPlant,
      streetLighting,
      typeAsNumber
    } = this.state;
    
    save({
      title,
      zai,
      name,
      description,
      type,
      googleMapLink,
      schoolType,
      latitude,
      longitude,
      duureg,
      horoo,
      dulaan,
      tsahilgaan,
      hamgaalalt,
      cable,
      phoneNumber,
      hospital,
      busStop,
      pharmacy,
      walkingEnvironment,
      Playground,
      shop,
      outdoorParking,
      camera,
      walkingEnv,
      basketball,
      playground,
      greenPlant,
      streetLighting,
      typeAsNumber
    });
    
    this.setState({ isSaved: true });
  }

  onChange = (name: string, value: any) => {
    this.setState({ [name]: value } as any)
  };
  
  renderFormTriger(trigger) {
    const content = () => (
      <a>sds</a>
    )

    return <ModalTrigger title="Add category" trigger={trigger} content={content} />
  }

  renderEditAction() {
    const trigger = (
      <Button btnStyle="link">
        <Tip text={__('Edit')} placement="bottom">
          <Icon icon="edit" />
        </Tip>
      </Button>
    );
    return (this.renderFormTriger(trigger))
  }

  renderCategoryHeader() {
    return (
      <>
        <Section.Title>
          {__('Type')}
          <Section.QuickButtons>

          </Section.QuickButtons>
        </Section.Title>
      </>
    )
  }

  renderCategoryListContent() {
    console.log(this.state.type, 'sdfsdfsdfsf')
    return (
      <SidebarListItem
        key={1}
        isActive={false}
      >
        <Link to={`?categoryId=${1}`}>
          {'Орчны мэдээлэл'}
        </Link>
        <ActionButtons>
          {this.renderEditAction()}
          {/* {this.renderRemoveAction(category)} */}
        </ActionButtons>
      </SidebarListItem>
    )
  }

  renderCategoryList() {
    return (
      <SidebarList>
        <DataWithLoader
          data={this.renderCategoryListContent()}
          loading={false}
          count={''}
          emptyText="There is no product & service category"
          emptyIcon="folder-2"
          size="small"
        />
      </SidebarList>
    )
  }

  setYourType(a) {

    this.onChange('typeAsNumber', a)
  }

  renderSidebar() {
    return (
      <>
        <Sidebar wide={true}>
          <Section
            maxHeight={488}
          >
            {this.renderCategoryHeader()}
          </Section>
          <Box
            title={__('Хөрш сургуулиуд')}
            collapsible={false}
          >
            <SidebarList>
              <li>
                <a onClick={this.setYourType.bind(this, 1)} >
                  <FieldStyle>Цэцэрлэг</FieldStyle>
                </a>
              </li>
              <li>
                <a onClick={this.setYourType.bind(this, 2)}>
                  <FieldStyle> Бага сургууль</FieldStyle>
                </a>
              </li>
              <li>
                <a onClick={this.setYourType.bind(this, 3)}>
                  <FieldStyle>Бүрэн дунд сургууль</FieldStyle>
                </a>
              </li>
              <li>
                <a onClick={this.setYourType.bind(this, 4)}>
                  <FieldStyle>Их дээд сургууль</FieldStyle>
                </a>
              </li>
            </SidebarList>
          </Box>
          <Box
            title={__('Ойр хавийн мэдээлэл')}
          >
            <SidebarList>
              <li>
                <a onClick={this.setYourType.bind(this, 5)}>
                  <FieldStyle>СӨХ</FieldStyle>
                </a>
              </li>
              <li>
                <a onClick={this.setYourType.bind(this, 6)}>
                  <FieldStyle> Хороо</FieldStyle>
                </a>
              </li>
              <li>
                <a onClick={this.setYourType.bind(this, 7)}>
                  <FieldStyle>Барилга</FieldStyle>
                </a>
              </li>
            </SidebarList>
          </Box>
          <Box
            title={__('Орчны мэдээлэл')}
          >
            <SidebarList>
              <li>
                <a onClick={this.setYourType.bind(this, 8)}>
                  <FieldStyle>Нийтийн эзэмшлүүд</FieldStyle>
                </a>
              </li>
              <li>
                <a onClick={this.setYourType.bind(this, 8)}>
                  <FieldStyle>Зогсоол</FieldStyle>
                </a>
              </li>
              <li>
                <a onClick={this.setYourType.bind(this, 9)}>
                  <FieldStyle>Эмийн сан</FieldStyle>
                </a>
              </li>
            </SidebarList>
          </Box>
          <Box
            title={__('Дүүргийн байрны мэдээлэл')}
          >
            <SidebarList>
              <li>
                <a onClick={this.setYourType.bind(this, 10)}>
                  <FieldStyle>Зах зээлийн үнэлгээ</FieldStyle>
                </a>
              </li>
              <li>
                <a onClick={this.setYourType.bind(this, 10)}>
                  <FieldStyle> Хүн амын үнэлгээ</FieldStyle>
                </a>
              </li>
              <li>
                <a onClick={this.setYourType.bind(this, 10)}>
                  <FieldStyle>Дүүргийн профайл</FieldStyle>
                </a>
              </li>
            </SidebarList>
          </Box>
        </Sidebar>
      </>
    )
  }
  renderRow() {

    return (
      <>
      </>)
  }
  renderContent() {
    return (<Table>
      <thead>
        <tr>
          <th>{__('Name')}</th>
          <th>{__('type')}</th>
          <th>{__('Created at')}</th>
          <th>{__('Created by')}</th>
          <th>{__('Status')}</th>
          <th style={{ width: 80 }} />
        </tr>
      </thead>
      <tbody>
        {this.renderRow()}
      </tbody>
    </Table>
    )
  }
  renderPopUpContent() {
    const options = [
      { value: '1', label: 'Цэцэрлэг' },
      { value: '2', label: ' Бага сургууль' },
      { value: '3', label: 'Бүрэн дунд сургууль' }
    ]

    const { typeAsNumber } = this.state
    let content
    switch (typeAsNumber) {
      case 1:
        content = (
          <>
            <FormGroup>
              <ControlLabel>
                Төрөл
              </ControlLabel>
              <Select

                value={'Цэцэрлэг'}
                options={options}
              >
              </Select>
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                Description
              </ControlLabel>
              <FormControl
                name="remainder"
                placeholder='Description..'></FormControl>
            </FormGroup>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Дүүрэг
                  </ControlLabel>
                  <Select
                    clearable={false}
                    placeholder="Дүүрэг"
                  ></Select>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Хороо
                  </ControlLabel>
                  <Select
                    placeholder="Хороо"
                    clearable={false}
                  ></Select>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
          </>
        )
        break;
      case 2:
        content = (
          <>
            <FormGroup>
              <ControlLabel>
                Төрөл
              </ControlLabel>
              <Select

                value={'Цэцэрлэг'}
                options={options}
              >
              </Select>
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                Description
              </ControlLabel>
              <FormControl
                name="remainder"
                placeholder='Description..'></FormControl>
            </FormGroup>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Дүүрэг
                  </ControlLabel>
                  <Select
                    clearable={false}
                    placeholder="Дүүрэг"
                  ></Select>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Хороо
                  </ControlLabel>
                  <Select
                    placeholder="Хороо"
                    clearable={false}
                  ></Select>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
          </>
        )
        break;
      case 3:
        content = (
          <>
            <FormGroup>
              <ControlLabel>
                Төрөл
              </ControlLabel>
              <Select

                value={'Цэцэрлэг'}
                options={options}
              >
              </Select>
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                Description
              </ControlLabel>
              <FormControl
                name="remainder"
                placeholder='Description..'></FormControl>
            </FormGroup>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Дүүрэг
                  </ControlLabel>
                  <Select
                    clearable={false}
                    placeholder="Дүүрэг"
                  ></Select>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Хороо
                  </ControlLabel>
                  <Select
                    placeholder="Хороо"
                    clearable={false}
                  ></Select>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
          </>
        )
        break;
      case 4:
        content = (
          <>
            <FormGroup>
              <ControlLabel>
                Төрөл
              </ControlLabel>
              <Select

                value={'Цэцэрлэг'}
                options={options}
              >
              </Select>
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                Description
              </ControlLabel>
              <FormControl
                name="remainder"
                placeholder='Description..'></FormControl>
            </FormGroup>
          </>
        )
        break;
      case 5:
        content = (
          <>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Дулаан
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Дулаан..'></FormControl>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Цахилгаан
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Цахилгаан..'></FormControl>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Харуул хамгаалалт
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Харуул хамгаалалт..'></FormControl>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Интернэт, кабель
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Интернэт, кабель..'></FormControl>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
          </>
        )
        break;
      case 6:
        content = (
          <>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Хорооны дугаар
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Хорооны дугаар..'></FormControl>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Зай
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Зай..'></FormControl>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Хаяг
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Хаяг..'></FormControl>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Утасны дугаар
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Утасны дугаар..'></FormControl>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Өрхийн эмнэлэг
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Өрхийн эмнэлэг..'></FormControl>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Автобусны буудал
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Автобусны буудал..'></FormControl>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
          </>
        )
        break;
      case 7:
        content = (
          <>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Дүүрэг
                  </ControlLabel>
                  <Select
                    clearable={false}
                    placeholder="Дүүрэг"
                  ></Select>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Хороо
                  </ControlLabel>
                  <Select
                    placeholder="Хороо"
                    clearable={false}
                  ></Select>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
          </>
        )
        break;
      case 8:
        content = (
          <>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Дүүрэг
                  </ControlLabel>
                  <Select
                    clearable={false}
                    placeholder="Дүүрэг"
                  ></Select>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Хороо
                  </ControlLabel>
                  <Select
                    placeholder="Хороо"
                    clearable={false}
                  ></Select>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
          </>
        )
        break;
      case 9:
        content = (
          <>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Дүүрэг
                  </ControlLabel>
                  <Select
                    clearable={false}
                    placeholder="Дүүрэг"
                  ></Select>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Хороо
                  </ControlLabel>
                  <Select
                    placeholder="Хороо"
                    clearable={false}
                  ></Select>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
          </>
        )
        break;
      case 10:
        content = (
          <>
            <FormGroup>
              <ControlLabel>
                Төрөл
              </ControlLabel>
              <Select

                value={'Цэцэрлэг'}
                options={options}
              >
              </Select>
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                Дэд төрөл
              </ControlLabel>
              <Select

                value={'Цэцэрлэг'}
                options={options}
              >
              </Select>
            </FormGroup>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Дундаж үнэ
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Дундаж үнэ..'></FormControl>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Дундаж м2
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Дундаж м2..'></FormControl>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Хүн ам
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Хүн ам.'></FormControl>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Дундаж нас
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Дундаж нас..'></FormControl>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Төрийн үйлчилгээ
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Төрийн үйлчилгээ..'></FormControl>
                </FormGroup>
              </ExpandWrapper>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Онцлох зарууд
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Онцлох зарууд..'></FormControl>
                </FormGroup>
              </ExpandWrapper>

            </FlexRow>
            <FlexRow>
              <ExpandWrapper>
                <FormGroup>
                  <ControlLabel>Зах
                  </ControlLabel>
                  <FormControl
                    name="remainder"
                    placeholder='Зах..'></FormControl>
                </FormGroup>
              </ExpandWrapper>
            </FlexRow>
          </>
        )
        break;
      case 11:
        break;
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
        onClick={this.save}
        icon="check-circle"
        uppercase={false}
      >
        Save
      </Button>
    )
    return (
      <>
        <FormGroup>
          <ControlLabel>
            Нэр
          </ControlLabel>
          <FormControl
            name="remainder"
            placeholder='Name..'></FormControl>
        </FormGroup>
        {content}

        <ModalFooter>{
          cancel}{save}
        </ModalFooter>
      </>
    )
  }

  renderAddButton() {
    const trigger = (
      <Button
        btnStyle="success"
        type='button'
        icon='check-circle'
        uppercase={false}
      >
        Add
      </Button>
    )
    const content = () => {
      return (
        <React.Fragment>
          {this.renderPopUpContent()}
        </React.Fragment>)
    }
    return (<>
      <ModalTrigger
        title="New+"
        autoOpenKey="showKBAddModal"
        trigger={trigger}
        content={content}
        enforceFocus={false}
      />
    </>)
  }

  renderAddAction() {
    return (this.renderAddButton())
  }

  render() {
    return (

      <Wrapper
        header={
          <Wrapper.Header
            title={__('Neighbor')}
            breadcrumb={
              [{ title: __('Settings'), link: '/settings' },
              { title: __('Neighbor') }]}
          />
        }
        content={this.renderContent()}
        leftSidebar={this.renderSidebar()}
        actionBar={
          < Wrapper.ActionBar
            right={this.renderAddAction()}
          />
        }
      ></Wrapper >
    )
  }
}
export default List