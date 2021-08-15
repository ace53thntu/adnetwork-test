import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';

/**
 * This component is extend from react-table
 * So you can use props of react-table if needed
 */
export default function Table({
  data,
  columns,
  defaultPageSize,
  striped,
  highlight,
  cursor,
  ...rest
}) {
  return (
    <ReactTable
      {...rest}
      data={data}
      columns={columns}
      defaultPageSize={defaultPageSize}
      className={`${striped ? '-striped' : ''} ${
        highlight ? '-highlight' : ''
      } ${cursor ? '-cursor' : ''}`}
    />
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultPageSize: PropTypes.number,
  striped: PropTypes.bool,
  highlight: PropTypes.bool,
  cursor: PropTypes.bool
};

Table.defaultProps = {
  data: [],
  columns: [],
  defaultPageSize: 10,
  striped: true,
  highlight: true,
  cursor: false
};
