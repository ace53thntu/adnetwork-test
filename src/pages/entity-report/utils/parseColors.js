import {validArray} from 'utils/helpers/dataStructure.helpers';

export const parseColors = color => {
  if (!color) {
    return [];
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
