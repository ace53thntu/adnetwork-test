import {PriorityOptions, StrategySources} from 'pages/Campaign/constants';

export const mappingStrategyFields = ({obj, fieldName}) => {
console.log("🚀 ~ file: utils.js ~ line 4 ~ mappingStrategyFields ~ fieldName", fieldName)
console.log("🚀 ~ file: utils.js ~ line 4 ~ mappingStrategyFields ~ obj", obj)
  if (!obj || typeof obj !== 'object' || !Object.keys(obj)) {
    return {
      old: '',
      new: ''
    };
  }


  if (fieldName === 'sources') {
    const oldVal = convertLogObjectToString(obj?.old, StrategySources);
    const newVal = convertLogObjectToString(obj?.new, StrategySources);
    return {
      old: oldVal,
      new: newVal
    };
  }

  if (fieldName === 'priority') {
    const oldVal = convertLogObjectToString(obj?.old, PriorityOptions);
    const newVal = convertLogObjectToString(obj?.new, PriorityOptions);
    return {
      old: oldVal,
      new: newVal
    };
  }

  return obj;
};

const convertLogObjectToString = (logsData, listData = []) => {
  if (typeof logsData === 'object' && Object.keys(logsData).length) {
    return Object.entries(logsData)?.reduce((acc, [objKey, val]) => {
      if (val) {
        const valueFromList = listData.find(item => item?.value === objKey);
        if (valueFromList) {
          acc = `${acc}, ${valueFromList?.label}`;
        }
      }
      if(acc.indexOf(',') === 0){
        acc = acc?.substring(1);
      }
      return acc;
    }, '');
  }

  if(typeof logsData === 'string' || typeof logsData === 'number'){
    const valueFromList = listData.find(item => item?.value === logsData);
    return valueFromList?.label || ''
  }

  return '';
};
