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
      text: 'Campaigns settings',
      icon: 'icon-megaphone',
      location: 'settings',
      scope: 'plugins',
      component: './settings',
      name: "Campaigns settings",
      image: "/images/icons/erxes-19.svg",
      to: "/settings/boards/ticket",
      action: "ticketsAll",
      permissions: [
        "ticketBoardsAdd",
        "ticketBoardsEdit",
        "ticketBoardsRemove",
        "ticketPipelinesAdd",
        "ticketPipelinesEdit",
        "ticketPipelinesUpdateOrder",
        "ticketPipelinesRemove",
        "ticketPipelinesArchive",
        "ticketPipelinesCopied",
        "ticketStagesAdd",
        "ticketStagesEdit",
        "ticketStagesUpdateOrder",
        "ticketStagesRemove",
      ],
    }
  ]
};
