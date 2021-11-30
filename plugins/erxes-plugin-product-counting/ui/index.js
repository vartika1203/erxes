import React from 'react';
import Haha from './containers/updateLog';
const updateCount =() =>{
  return (
    <Haha/>
  )
}
export default () =>({
  routes:[
    {
      path:'/settings',
      component: updateCount
    }
  ],
  settings:[
    {
      name: 'Product Counting',
      image:'/images/icons/erxes-06.svg',
      to:'/erxes-plugin-product-counting/settings',
      permissions: []
    }
  ]
})
