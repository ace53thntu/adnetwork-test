import {validArray} from 'utils/helpers/dataStructure.helpers';

export const parseColors = (color = [], metricSet = []) => {
  if (!color || color === '[]' || color.length === 0) {
    if (!metricSet || metricSet?.length === 0) {
      return [];
    }
    const colorSize = metricSet?.length;
    const newColors = INITIALIZING_COLORS;
    newColors.length = colorSize;
    return newColors;
  }

  if (color && typeof color === 'string' && !color.includes('[')) {
    if (color.includes(',')) {
      return color?.split(',');
    }
    return [color];
  }

  if (typeof color !== 'string') {
    return color;
  }

  try {
    const colors = JSON.parse(color);
    return colors;
  } catch (error) {
    if (!validArray({list: color})) {
      return [color];
    }
    return [];
  }
};

export const convertColors = ({colors}) => {
  if (colors && typeof colors === 'string') {
    if (colors.includes('[')) {
      try {
        return JSON.parse(colors);
      } catch (err) {
        return [];
      }
    }
    if (colors.includes(',')) {
      return colors.split(',');
    }
    return [colors];
  }
  return [];
};

export const hexToRgbA = (hex = '#e09f3e') => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return (
      'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.4)'
    );
  }
  return 'rgba(75,192,192,0.4)'; //throw new Error('Bad Hex');
};

export const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`;

const INITIALIZING_COLORS = [
  '#9b5de5',
  '#f15bb5',
  '#fee440',
  '#00bbf9',
  '#00f5d4',
  '#005f73',
  '#0a9396',
  '#94d2bd',
  '#e9d8a6',
  '#ee9b00',
  '#ca6702',
  '#bb3e03',
  '#b4418e',
  '#ae2012',
  '#15a2a2',
  '#9b2226',
  '#f5cac3',
  '#f28482',
  '#f6bd60'
];

export const initializingColors = ({
  sizeOfData = 0,
  existedColors,
  isChartCompare
}) => {
  if (sizeOfData === 0) return [];
  //---> For compare chart (unit is Global)
  if (isChartCompare && sizeOfData !== existedColors?.length) {
    const tmpArr = [];

    for (let index = 0; index < sizeOfData; index++) {
      tmpArr.push(INITIALIZING_COLORS[index]);
    }

    return tmpArr;
  }

  if (typeof existedColors === 'string') {
    try {
      return JSON.parse(existedColors);
    } catch (err) {
      console.log('🚀 ~ file: parseColors.js ~ line 103 ~ err', err);
      return [];
    }
  }

  if (!existedColors || existedColors?.length === 0) {
    return [INITIALIZING_COLORS[0]];
  }

  return existedColors;
};

export const initColors = ({sizeOfData}) => {
  const tmpArr = [];

  for (let index = 0; index < sizeOfData; index++) {
    tmpArr.push(INITIALIZING_COLORS[index]);
  }

  return tmpArr;
};
