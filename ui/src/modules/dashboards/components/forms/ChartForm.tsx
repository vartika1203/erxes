import React from 'react';
import { Tabs, TabTitle } from 'modules/common/components/tabs';
import { __ } from 'modules/common/utils';
// , confirm
import { TRIGGERS } from 'modules/dashboards/constants';
import {
  TypeBox,
  ScrolledContent,
  Description,
  TriggerTabs
} from 'modules/dashboards/styles';
// import { ITrigger } from 'modules/automations/types';
// import gql from 'graphql-tag';
// import { mutations, queries } from 'modules/automations/graphql';
import FormGroup from 'modules/common/components/form/Group';
import ControlLabel from 'modules/common/components/form/Label';
// import client from 'erxes-ui/lib/apolloClient';

// type Props = {
//   onClickTrigger: (trigger: ITrigger) => void;
//   templates: any[];
// };

// type State = {
//   currentTab: string;
//   currentType: string;
// };

class ChartForm extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     currentTab: 'new',
  //     currentType: 'customer'
  //   };
  // }

  // tabOnClick = (currentTab: string) => {
  //   this.setState({ currentTab });
  // };

  // onClickType = (trigger: ITrigger) => {
  //   const { onClickTrigger } = this.props;

  //   this.setState({ currentType: trigger.type }, () => {
  //     onClickTrigger(trigger);
  //   });
  // };

  renderTriggerItem(trigger: any, index: number) {
    return (
      <TypeBox key={index}>
        {/* onClick={this.onClickType.bind(this, trigger)} */}
        <img src={`/images/actions/${trigger.img}`} alt={trigger.label} />
        <FormGroup>
          <ControlLabel>{trigger.label}</ControlLabel>
        </FormGroup>
      </TypeBox>
    );
  }

  renderTabContent() {
    return TRIGGERS.map((trigger, index) =>
      this.renderTriggerItem(trigger, index)
    );
  }

  render() {
    // const { currentTab } = this.state;

    return (
      <>
        <Description>
          <h4>{__('Choose your chart type')}</h4>
          <p>{__('Start with an reports type that filters...')}</p>
        </Description>
        <TriggerTabs>
          <Tabs full={true}>
            <TabTitle
            // className={currentTab === 'new' ? 'active' : ''}
            // onClick={this.tabOnClick.bind(this, 'new')}
            >
              {__('Start from scratch')}
            </TabTitle>
            <TabTitle
            // className={currentTab === 'library' ? 'active' : ''}
            // onClick={this.tabOnClick.bind(this, 'library')}
            >
              {__('Library')}
            </TabTitle>
          </Tabs>
        </TriggerTabs>
        <ScrolledContent>{this.renderTabContent()}</ScrolledContent>
      </>
    );
  }
}

export default ChartForm;
