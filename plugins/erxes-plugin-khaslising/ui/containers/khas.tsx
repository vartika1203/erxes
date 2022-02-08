import React from 'react'
import XasLising from '../components/xaslisingBoard'
import {
  Wrapper, Alert
} from 'erxes-ui';
type State = {}
type Props ={}
class XasIndex extends React.Component<Props,State>{
  constructor(props:Props) {
    super(props)
  }
  
  render() {
    // const content = (<XasLising/>)
    return (<XasLising/>)
  }
}
export default XasIndex