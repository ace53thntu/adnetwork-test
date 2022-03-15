import React from 'react';

function NoReportAvailable() {
  return (
    <div
      style={{
        fontWeight: 600,
        width: '100%',
        backgroundColor: 'hsl(0,0%,95%)',
        padding: '15px 0',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      No report
    </div>
  );
}

export default React.memo(NoReportAvailable);
