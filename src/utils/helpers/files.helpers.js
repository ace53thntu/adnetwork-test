export function exportToJsonFile(jsonData, filename) {
  const dataStr = JSON.stringify(jsonData);
  const dataUri =
    'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileDefaultName = `${filename}.json`;

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

export function parseJSONToCSVStr(jsonData) {
  if (jsonData.length === 0) {
    return '';
  }

  const keys = Object.keys(jsonData[0]);

  const columnDelimiter = ',';
  const lineDelimiter = '\n';

  const csvColumnHeader = keys.join(columnDelimiter);
  let csvStr = csvColumnHeader + lineDelimiter;

  jsonData.forEach(item => {
    keys.forEach((key, index) => {
      if (index > 0 && index < keys.length - 1) {
        csvStr += columnDelimiter;
      }
      csvStr += item[key];
    });
    csvStr += lineDelimiter;
  });

  return encodeURIComponent(csvStr);
}

export function exportToCsvFile(csvStr, filename) {
  const dataUri = 'data:text/csv;charset=utf-8,' + csvStr;

  const exportFileDefaultName = `${filename}.csv`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

/**
 * Converts a long string of bytes into a readable format e.g KB, MB, GB, TB, YB
 *
 * @param {Int} num The number of bytes.
 */
export function readableBytes(num) {
  const neg = num < 0;
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (neg) {
    num = -num;
  }

  if (num < 1) {
    return (neg ? '-' : '') + num + ' B';
  }

  const exponent = Math.min(
    Math.floor(Math.log(num) / Math.log(1000)),
    units.length - 1
  );

  num = Number((num / Math.pow(1000, exponent)).toFixed(2));

  const unit = units[exponent];

  return (neg ? '-' : '') + num + ' ' + unit;
}

export function isImage(type) {
  return (
    type === 'image/jpeg' || type === 'image/png' || type === 'image/svg+xml'
  );
}
