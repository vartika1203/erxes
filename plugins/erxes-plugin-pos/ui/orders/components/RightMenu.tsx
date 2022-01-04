import Datetime from '@nateradebaugh/react-datetime';
import dayjs from 'dayjs';
import React from 'react';
import RTG from 'react-transition-group';
import {
  __,
  Button,
  ControlLabel,
  FormControl,
  Icon,
  SelectCompanies,
  SelectCustomers
} from 'erxes-ui';
import {
  CustomRangeContainer,
  FilterBox,
  FilterButton,
  MenuFooter,
  RightMenuContainer,
  TabContent
} from '../../styles';

type Props = {
  onSearch: (search: string) => void;
  onSelect: (values: string[] | string, key: string) => void;
  queryParams: any;
  isFiltered: boolean;
  clearFilter: () => void;
};

type StringState = {
  currentTab: string;
};

type State = {
  showMenu: boolean;
} & StringState;

export default class RightMenu extends React.Component<Props, State> {
  private wrapperRef;

  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'Filter',
      showMenu: false
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  onSearch = (e: React.KeyboardEvent<Element>) => {
    if (e.key === 'Enter') {
      const target = e.currentTarget as HTMLInputElement;
      this.props.onSearch(target.value || '');
    }
  };

  onChange = (name: string, value: string) => {
    this.setState({ [name]: value } as Pick<StringState, keyof StringState>);
  };

  renderLink(label: string, key: string, value: string) {
    const { onSelect, queryParams } = this.props;

    const selected = queryParams[key] === value;

    const onClick = _e => {
      onSelect(value, key);
    };

    return (
      <FilterButton selected={selected} onClick={onClick}>
        {__(label)}
        {selected && <Icon icon="check-1" size={14} />}
      </FilterButton>
    );
  }

  onChangeRangeFilter = (kind, date) => {
    const cDate = dayjs(date).format('YYYY-MM-DD HH:mm')
    this.props.onSelect(cDate, kind);
  };

  renderSpecials() {
    return (
      <>
        {this.renderLink('Only Today', 'payDate', 'today')}
        {this.renderLink('Only Me', 'userId', 'me')}
        {this.renderLink('No Pos', 'userId', 'nothing')}
      </>
    );
  }

  renderRange(dateType: string) {
    const { queryParams } = this.props;

    const lblStart = `${dateType}StartDate`;
    const lblEnd = `${dateType}EndDate`;

    return (
      <>
        <ControlLabel>{`${dateType} Date range:`}</ControlLabel>

        <CustomRangeContainer>
          <div className="input-container">
            <Datetime
              inputProps={{ placeholder: __('Click to select a date') }}
              dateFormat="YYYY/MM/DD"
              timeFormat="HH:mm"
              value={queryParams[lblStart]}
              closeOnSelect={true}
              utc={true}
              input={true}
              onChange={this.onChangeRangeFilter.bind(this, lblStart)}
              viewMode={'days'}
              className={'filterDate'}
              defaultValue={dayjs()
                .startOf('day')
                .add(12, 'hour')
                .format('YYYY-MM-DD HH:mm:ss')}
            />
          </div>

          <div className="input-container">
            <Datetime
              inputProps={{ placeholder: __('Click to select a date') }}
              dateFormat="YYYY/MM/DD"
              timeFormat="HH:mm"
              value={queryParams[lblEnd]}
              closeOnSelect={true}
              utc={true}
              input={true}
              onChange={this.onChangeRangeFilter.bind(this, lblEnd)}
              defaultValue={dayjs()
                .startOf('day')
                .add(12, 'hour')
                .format('YYYY-MM-DD HH:mm:ss')}
            />
          </div>
        </CustomRangeContainer>
      </>
    )
  }

  renderFilter() {
    const { queryParams, onSelect } = this.props;

    return (
      <FilterBox>
        <FormControl
          defaultValue={queryParams.search}
          placeholder={__('Number ...')}
          onKeyPress={this.onSearch}
          autoFocus={true}
        />

        <SelectCustomers
          label="Filter by customer"
          name="customerId"
          queryParams={queryParams}
          onSelect={onSelect}
          multi={false}
        />

        <SelectCompanies
          label="Filter by company"
          name="companyId"
          queryParams={queryParams}
          onSelect={onSelect}
          multi={false}
        />

        {this.renderRange('created')}
        {this.renderRange('paid')}
        {this.renderRange('finance')}

        {this.renderSpecials()}

      </FilterBox>
    );
  }

  renderTabContent() {
    const { isFiltered, clearFilter } = this.props;

    return (
      <>
        <TabContent>{this.renderFilter()}</TabContent>
        {isFiltered && (
          <MenuFooter>
            <Button
              block={true}
              btnStyle="warning"
              uppercase={false}
              onClick={clearFilter}
              icon="times-circle"
            >
              {__('Clear Filter')}
            </Button>
          </MenuFooter>
        )}
      </>
    );
  }

  render() {
    const { showMenu } = this.state;
    const { isFiltered } = this.props;

    return (
      <div ref={this.setWrapperRef}>
        {isFiltered && (
          <Button
            btnStyle="warning"
            icon="times-circle"
            uppercase={false}
            onClick={this.props.clearFilter}
          >
            {__('Clear Filter')}
          </Button>
        )}
        <Button
          btnStyle="simple"
          uppercase={false}
          icon="bars"
          onClick={this.toggleMenu}
        >
          {showMenu ? __('Hide Filter') : __('Show Filter')}
        </Button>

        <RTG.CSSTransition
          in={this.state.showMenu}
          timeout={300}
          classNames="slide-in-right"
          unmountOnExit={true}
        >
          <RightMenuContainer>
            {this.renderTabContent()}
          </RightMenuContainer>
        </RTG.CSSTransition>
      </div>
    );
  }
}
