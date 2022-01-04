module.exports = {
  name: "forms",
  port: 3005,
  exposes: {
    "./leads": "./src/leads.tsx",
    "./settings": "./src/Settings.tsx",
  },
  routes: {
    url: "http://localhost:3005/remoteEntry.js",
    scope: "leads",
    module: "./leads",
  },
  menus: [
    {
      text: "Form",
      url: "/forms",
      icon: "icon-laptop",
      location: "mainNavigation",
    },
  ],
};
