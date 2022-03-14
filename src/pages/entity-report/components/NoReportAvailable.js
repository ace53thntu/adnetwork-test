import React from 'react';

function NoReportAvailable() {
  return (
    <div
      style={{
        textAlign: 'center',
        fontWeight: 600,
        width: '100%',
        backgroundColor: 'hsl(0,0%,95%)',
        padding: '15px 0'
      }}
    >
      No report
    </div>
  );
}

export default React.memo(NoReportAvailable);
