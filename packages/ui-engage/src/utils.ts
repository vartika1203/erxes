
export const crudMutationsOptions = () => {
  return {
    refetchQueries: [
      'engageMessages',
      'engageMessagesTotalCount',
      'kindCounts',
      'statusCounts'
    ]
  };
};

export const generateEmailTemplateParams = emailTemplates => {
  return emailTemplates.map(template => ({
    value: template._id,
    label: template.name
  }));
};