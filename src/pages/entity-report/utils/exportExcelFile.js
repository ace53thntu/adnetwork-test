import {TimeUnits} from 'constants/report';
import {capitalize} from 'utils/helpers/string.helpers';
import {utils, writeFile} from 'xlsx';

const LENGTH_OF_FILE_NAME = 200;

export const exportFile = ({
  evt,
  metricData,
  metricSet,
  timeUnit,
  reportBy,
  reportName,
  timeRange,
  reportSource,
  reportType,
  parentPath
}) => {
  evt.preventDefault();
  evt.stopPropagation();

  const sheetData =
    timeUnit !== TimeUnits.GLOBAL
      ? generateSheetDataNormal({metricData, metricSet})
      : generateSheetDataGlobal({metricData, metricSet, reportBy});
  const sheetInfo = getDataSheetInfo({
    reportName,
    timeRange,
    timeUnit,
    reportSource,
    reportType,
    reportBy,
    parentPath,
    metricSet
  });
  /* convert state to workbook */
  const ws = utils.aoa_to_sheet(sheetData);
  const ws2 = utils.aoa_to_sheet(sheetInfo);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'data');
  utils.book_append_sheet(wb, ws2, 'info');
  /* generate XLSX file and send to client */
  const fileName = generateReportName({
    reportName,
    reportSource,
    parentPath,
    metricSet
  });
  writeFile(wb, `${fileName}.xlsx`);
};

const generateSheetDataNormal = ({metricData, metricSet}) => {
  //---> List metric set as columns
  const headerCols = metricSet?.map(item => item.label);
  const headersRow = ['Date', ...headerCols];
  const dateRows = metricData?.labels || [];
  const datasets = metricData?.datasets || [];
  const dataRows = dateRows?.reduce((acc, item, labelIndex) => {
    const dataTmpArr = [];
    for (let dataset of datasets) {
      const {data} = dataset;
      const dataAtLabelIndex = data?.[labelIndex]?.y;
      dataTmpArr.push(dataAtLabelIndex);
    }

    acc.push([item, ...dataTmpArr]);
    return acc;
  }, []);
  const sheetData = [headersRow, ...dataRows];
  return sheetData;
};

const generateSheetDataGlobal = ({metricData, metricSet, reportBy}) => {
  const headerCols = metricSet?.map(item => item.label);
  const dateRows = metricData?.labels || [];
  const headersRow = [capitalize(reportBy), ...headerCols];

  const datasets = metricData?.datasets || [];
  const dataRows = dateRows?.reduce((acc, item, labelIndex) => {
    const dataTmpArr = [];
    for (let dataset of datasets) {
      const {data} = dataset;
      const dataAtLabelIndex = data?.[labelIndex];
      dataTmpArr.push(dataAtLabelIndex);
    }

    acc.push([item, ...dataTmpArr]);
    return acc;
  }, []);
  const sheetData = [headersRow, ...dataRows];
  return sheetData;
};

const getDataSheetInfo = ({
  reportName: name,
  timeRange,
  timeUnit,
  reportSource,
  reportType,
  reportBy,
  parentPath,
  metricSet
}) => {
  const splitNameArr = name?.split('/') || [];
  const destructedSlitNameArr = splitNameArr?.map((item, index) => ({
    text: item,
    parent: index === 0 ? 'false' : 'true'
  }));

  const pathNameArr = parentPath?.split('/') || [];
  const destructedPathNameArr = pathNameArr?.map(item => ({
    text: item,
    parent: 'true'
  }));

  const metricSetList = metricSet?.map(item => {
    return item?.label;
  });
  const metricSetStr = metricSetList.join(', ');

  const mergedArr = [...destructedPathNameArr, ...destructedSlitNameArr];
  let reportName = '';
  mergedArr?.forEach((element, idx) => {
    if (idx !== mergedArr?.length - 1) {
      if (idx === 0) {
        reportName = `${reportName}[${reportSource}]`;
      }
      reportName = `${reportName} ${element?.text}`;
      if ((idx === 0 && parentPath) || idx !== 0) {
        reportName = `${reportName} >`;
      }
    } else {
      reportName = `${reportName} ${element?.text}`;
    }
  });

  reportName = `${reportName} -- ${metricSetStr}`;

  return [
    ['Report name', reportName],
    ['Report type', reportType],
    ['Report source', reportSource],
    ['Report by', reportBy],
    ['Time range', timeRange],
    ['Time unit', timeUnit]
  ];
};

const generateReportName = ({
  reportName: name,
  reportSource,
  parentPath,
  metricSet
}) => {
  const splitNameArr = name?.split('/') || [];
  const destructedSlitNameArr = splitNameArr?.map((item, index) => ({
    text: item
  }));

  const pathNameArr = parentPath?.split('/') || [];
  const destructedPathNameArr = pathNameArr?.map(item => ({
    text: item
  }));

  const metricSetList = metricSet?.map(item => {
    return item?.label;
  });
  const metricSetStr = metricSetList.join(', ');

  const mergedArr = [...destructedPathNameArr, ...destructedSlitNameArr];

  let reportName = '';
  mergedArr?.forEach((element, idx) => {
    reportName = `${reportName}${element?.text}`;
    if ((idx === 0 && parentPath) || idx !== 0) {
      reportName = `${reportName}-`;
    }
  });

  reportName = `${reportSource}-${reportName}${metricSetStr}`;
  reportName = reportName?.trim();
  reportName = reportName?.toLowerCase();
  reportName = reportName.replace(/\s/g, '-');
  reportName = reportName.replace(/,/g, '-');
  reportName = reportName.replace(/:/g, '-');
  reportName = reportName.replace(/---/g, '-');
  reportName = reportName.replace(/--/g, '-');

  if (reportName?.length > LENGTH_OF_FILE_NAME) {
    reportName = reportName.substring(0, LENGTH_OF_FILE_NAME);
  }

  return reportName;
};
