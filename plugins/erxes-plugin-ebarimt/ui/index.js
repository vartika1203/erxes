import queryString from 'query-string';
import Settings from './containers/Settings';
import GeneralSettings from './components/GeneralSettings'
import StageSettings from './components/StageSettings'
import ReturnStageSettings from './components/ReturnStageSettings'
import React from 'react';
import Response from './containers/Response';
import PutResponses from './containers/PutResponses';

const returnResponse = ({ currentUser }) => {
  return (
    <Response currentUser={currentUser}></Response>
  )
}

const GeneralSetting = () => {
  return (
    <Settings
      component={GeneralSettings}
    ></Settings>
  )
}

const StageSetting = () => {
  return (
    <Settings
      component={StageSettings}
    ></Settings>
  )
}

const ReturnStageSetting = () => {
  return (
    <Settings
      component={ReturnStageSettings}
    ></Settings>
  )
}

const PutResponsesComponent = ({ location, history }) => {
  return (
    <PutResponses
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  )
}

export default () => ({
  routes: [
    {
      path: '/settings/general',
      component: GeneralSetting
    },
    {
      path: '/settings/stage',
      component: StageSetting
    },
    {
      path: '/settings/return-stage',
      component: ReturnStageSetting
    },
    {
      path: '/put-responses',
      component: PutResponsesComponent
    }
  ],
  settings: [
    {
      name: 'Ebarimt config',
      image: '/images/icons/erxes-04.svg',
      to: '/erxes-plugin-ebarimt/settings/general',
      action: 'syncEbarimtConfig',
      permissions: [],
    }
  ],
  menu: {
    label: 'Put Responses',
    icon: 'icon-lamp',
    link: '/put-responses',
    // permission: 'showCars'
  },
  response: returnResponse
});
