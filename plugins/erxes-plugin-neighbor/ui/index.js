import React from 'react';
import MainList from './containers/list'
const xasLising =() =>{
 
  return (
    <MainList/>
  )
}
export default () =>({
  
  routes:[
    {
      path:'/settings/',
      component: xasLising
    }
  ],
  settings:[
    {
      name: 'Neighbor',
      image:'/images/icons/erxes-05.svg',
      to:'/erxes-plugin-neighbor/settings',
      permissions: []
    }
  ],
  productCategoryActions: [
    {
      component: <div>This is component</div>
    }
  ]
})