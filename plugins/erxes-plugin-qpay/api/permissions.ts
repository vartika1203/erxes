export default [
  { name: "showQr", description: "Show qr" },
  { name: "manageQr", description: "Manage qr" },
  {
    name: "allQr",
    description: "All",
    use: ["showQr", "manageQr"],
  },
];
