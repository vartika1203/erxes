import React from 'react'
import ActionButtons from '../../../../ui/src/modules/common/components/ActionButtons';
import Button from '../../../../ui/src/modules/common/components/Button';
import Icon from '../../../../ui/src/modules/common/components/Icon';
import ModalTrigger from '../../../../ui/src/modules/common/components/ModalTrigger';
import Tip from '../../../../ui/src/modules/common/components/Tip';
import { __ } from '../../../../ui/src/modules/common/utils';
import {
  Wrapper, Alert, Table
} from 'erxes-ui';
import List from '../components/list'
type Props = {}
type State = {}

class MainList extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    const saveList = () => {
      
    }
  }

  render() {
    
    return (
      <List/>
    )
  }
}
export default MainList