import {matchSorter} from 'match-sorter';

export const filterStringByKey = (rows, value, key) =>
  matchSorter(rows, value, {keys: [key]});

export const filterBySelect = (rows, value, key) => {
  if (value === 'all') {
    return rows;
  } else {
    return rows.filter(row => row[key] === value);
  }
};
