export const formValuesToRepo = (formValues, referenceId, referenceType) => {
  const {template, ...rest} = formValues;

  let result = {
    template_uuid: template.value,
    reference_uuid: referenceId,
    reference_type: referenceType,
    status: 'active'
  };

  if (rest && Object.keys(rest).length) {
    let variables = {};
    Object.keys(rest).forEach(key => {
      variables[key] = rest[key];
    });
    result.variables = variables;
  }

  return result;
};

export const trackerToFormValues = tracker => {
  const {tracker_template, variables} = tracker;

  let result = {
    template: {
      label: tracker_template.name,
      value: tracker_template.uuid,
      variables: tracker_template.variables
    }
  };

  if (variables && Object.keys(variables).length) {
    result.variables = variables;
  }
  console.log('---result: ', result);
  return result;
};
