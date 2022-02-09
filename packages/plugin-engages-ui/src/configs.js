module.exports = {
  name: 'engages',
  port: 3001,
  exposes: {
    './routes': './src/routes.tsx',
    './settings': './src/Settings.tsx'
  },
  routes: {
    url: 'http://localhost:3001/remoteEntry.js',
    scope: 'engages',
    module: './routes'
  },
  menus: [
    {
      text: 'Campaigns',
      url: '/campaigns',
      icon: 'icon-megaphone',
      location: 'mainNavigation'
    },
    {
      text: 'Campaigns',
      icon: 'icon-megaphone',
      location: 'settings',
      to: '/settings/campaigns',
      image: '/images/icons/erxes-31.png',
      scope: 'engages',
      component: './settings'
    }
  ]
};
