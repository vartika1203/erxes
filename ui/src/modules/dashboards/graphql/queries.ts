const dashboardDetails = `
    query dashboardDetails($_id: String!){
        dashboardDetails(_id: $_id){
            _id
            name
        }
    }
`;

const dashboards = `
    query dashboards {
        dashboards{
            _id
            name
        }
    }
`;

export default { dashboardDetails, dashboards };
