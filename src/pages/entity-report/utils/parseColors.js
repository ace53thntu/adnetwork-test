import {ChartTypes} from 'constants/report';
import {validArray} from 'utils/helpers/dataStructure.helpers';

export const parseColors = color => {
  console.log('🚀 ~ file: parseColors.js ~ line 5 ~ color', color);
  if (!color) {
    return [];
  }

  if (typeof color !== 'string') {
    return color;
  }

  try {
    const colors = JSON.parse(color);
    console.log('🚀 ~ file: parseColors.js ~ line 16 ~ colors', colors);
    return colors;
  } catch (error) {
    console.log('🚀 ~ file: parseColors.js ~ line 18 ~ error', error);
    if (!validArray({list: color})) {
      return [color];
    }
    return [];
  }
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

export const initializingColors = ({
  sizeOfData = 0,
  existedColors,
  charType
}) => {
  console.log(
    '🚀 ~ file: parseColors.js ~ line 52 ~ sizeOfData',
    sizeOfData,
    existedColors,
    charType
  );
  if (sizeOfData === 0) return [];
  if (charType === ChartTypes.PIE && sizeOfData !== existedColors?.length) {
    const tmpArr = [];

    for (let index = 0; index < sizeOfData; index++) {
      tmpArr.push(randomHex());
    }
    return tmpArr;
  }

  if (typeof existedColors === 'string') {
    try {
      return JSON.parse(existedColors);
    } catch (err) {
      return [];
    }
  }

  if (charType !== ChartTypes.PIE && !validArray({list: existedColors})) {
    return [randomHex()];
  }

  return existedColors;
};
