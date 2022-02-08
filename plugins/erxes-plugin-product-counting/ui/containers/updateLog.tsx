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

  render() {
  
    return (
    
      <ProductCountingLog/>
    )
  }
}
export default UpdateLog