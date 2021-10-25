const dashboardsAdd = `
    mutation dashboardAdd($name: String){
        dashboardAdd(name: $name) {
            _id
            name
        }
    }
`;

export default { dashboardsAdd };
