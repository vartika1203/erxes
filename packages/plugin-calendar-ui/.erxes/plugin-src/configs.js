module.exports = {
  name: 'calendar',
  port: 3006,
  exposes: {
    './routes': './src/routes.tsx',
    './settings': './src/Settings.tsx'
  },
  routes: {
    url: 'http://localhost:3006/remoteEntry.js',
    scope: 'calendar',
    module: './routes'
  },
  menus: [
    {
      text: 'Calendar',
      url: '/calendar',
      icon: 'icon-calendar-alt',
      location: 'mainNavigation'
    },
    {
      text: 'Calendar settings',
      icon: 'icon-calendar-alt',
      location: 'settings',
      scope: 'plugin',
      component: './settings',
      name: 'Calendar',
      image: '/images/icons/erxes-21.svg',
      to: '/settings/calendars',
      action: 'calendarsAll',
      permissions: [
        'calendarsAdd',
        'calendarsEdit',
        'calendarsRemove',
        'showCalendars',
        'showCalendarGroups',
        'calendarGroupsAdd',
        'calendarGroupsEdit',
        'calendarGroupsRemove'
      ]
    }
  ]
};
