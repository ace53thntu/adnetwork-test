import React from 'react';

export default function TableStatusCell({row}) {
  return (
    <div className="d-block w-100 text-center">
      <span
        className={`badge badge-${
          row.value === 'active'
            ? 'success'
            : row.value === 'inactive'
            ? 'danger'
            : 'secondary'
        }`}
      >
        {row.value}
      </span>
    </div>
  );
}
