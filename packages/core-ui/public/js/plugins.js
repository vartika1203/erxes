window.plugins = [
  {
    name: "inbox",
    port: 3009,
    exposes: {
      "./routes": "./src/routes.tsx",
      "./settings": "./src/Settings.tsx",
    },
    routes: {
      url: "http://localhost:3009/remoteEntry.js",
      scope: "inbox",
      module: "./routes",
    },
    menus: [
      {
        text: "Team Inbox",
        url: "/inbox",
        icon: "icon-comment-1",
        location: "mainNavigation",
      },
    ],
  },
];
