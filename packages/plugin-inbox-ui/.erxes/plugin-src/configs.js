module.exports = {
  name: 'inbox',
  port: 3009,
  exposes: {
    './routes': './src/routes.tsx',
    './settings': './src/Settings.tsx'
  },
  routes: {
    url: 'http://localhost:3009/remoteEntry.js',
    scope: 'inbox',
    module: './routes'
  },
  menus: [
    {
      text: 'Team Inbox',
      url: '/inbox',
      icon: 'icon-comment-1',
      location: 'mainNavigation'
    },
    {
      text: 'Bookings',
      url: '/bookings',
      icon: 'icon-paste',
      location: 'mainNavigation'
    },
    {
      text: 'Forms',
      url: '/forms',
      icon: 'icon-head-1',
      location: 'mainNavigation'
    },
    {
      text: 'Skills',
      location: 'settings',
      image: '/images/icons/erxes-29.png',
      to: '/settings/skills',
      scope: 'inbox',
      component: './settings'
    },
    {
      text: 'Channels',
      location: 'settings',
      image: '/images/icons/erxes-05.svg',
      to: '/settings/channels',
      scope: 'inbox',
      component: './settings'
    },
    {
      text: 'Integrations',
      location: 'settings',
      image: '/images/icons/erxes-04.svg',
      to: '/settings/integrations',
      scope: 'inbox',
      component: './settings'
    },
    {
      text: 'Response Template',
      location: 'settings',
      image: '/images/icons/erxes-10.svg',
      to: '/settings/response-templates',
      scope: 'inbox',
      component: './settings'
    }
  ]
};
