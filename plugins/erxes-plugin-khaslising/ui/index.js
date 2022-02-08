import React from 'react';
import Haha from './containers/khas';
const xasLising =() =>{
 
  return (
    <Haha/>
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
      name: 'Xas Lising',
      image:'/images/icons/erxes-05.svg',
      to:'/erxes-plugin-khaslising/settings',
      permissions: []
    }
  ]
})