const dashboardsAdd = `
    mutation dashboardAdd($name: String){
        dashboardAdd(name: $name) {
            _id
            name
        }
    }
`;

const dashboardsRemove = `
    mutation dashboardRemove($_id: String!){
        dashboardRemove(_id:$_id) 
  }
`;

export default { dashboardsAdd, dashboardsRemove };
