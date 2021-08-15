import React from 'react';

export default function TableFilterSelect({
  onChange = () => {},
  filter = {},
  options = [],
}) {
  return (
    <select
      onChange={event => onChange(event.target.value)}
      style={{width: '100%'}}
      value={filter ? filter.value : 'all'}
    >
      <option value="all">All</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
