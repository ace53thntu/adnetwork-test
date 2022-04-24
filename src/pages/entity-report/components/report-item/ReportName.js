import React from 'react';

import styled from 'styled-components';
import {Badge} from 'reactstrap';

const PathItem = styled.span`
  font-size: ${props => (props?.parent === 'true' ? '12px' : '13px')};
  color: ${props => (props?.parent === 'true' ? 'inherit' : '#263238')};
  font-weight: ${props => (props?.parent === 'true' ? 'normal' : 'bold')};
  &:last-child {
    margin-right: 0;
  }
`;

const Separator = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  -moz-user-select: none;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  color: rgba(0, 0, 0, 0.54);
`;

const getColorByReportSource = reportSource => {
  let color = 'secondary';
  if (
    [
      'advertiser',
      'campaign',
      'strategy',
      'concept',
      'creative',
      'video',
      'native_ad'
    ].includes(reportSource)
  ) {
    color = 'danger';
  } else if (
    ['publisher', 'container', 'page', 'inventory'].includes(reportSource)
  ) {
    color = 'primary';
  }

  return color;
};

const ReportName = ({
  name = '',
  parentPath = '',
  reportSource = '',
  metricSet
}) => {
  const splitNameArr = name?.split('/') || [];
  const destructedSlitNameArr = splitNameArr?.map((item, index) => ({
    text: item,
    parent: index === 0 ? 'false' : 'true'
  }));

  const pathNameArr = parentPath?.split('/') || [];
  const destructedPathNameArr = pathNameArr?.map(item => ({
    text: item,
    parent: 'true'
  }));

  const metricSetList = metricSet?.map(item => {
    return item?.label;
  });
  const metricSetStr = metricSetList.join(', ');

  const mergedArr = [...destructedPathNameArr, ...destructedSlitNameArr];

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        {mergedArr?.map((item, idx) => {
          return (
            <React.Fragment key={`pr-${idx}`}>
              {idx !== mergedArr?.length - 1 ? (
                <>
                  {idx === 0 && (
                    <Badge
                      className="mr-2"
                      color={getColorByReportSource(reportSource)}
                      style={{fontSize: 10}}
                    >
                      {reportSource}
                    </Badge>
                  )}
                  {<PathItem parent={item?.parent}>{item?.text}</PathItem>}
                  {((idx === 0 && parentPath) || idx !== 0) && (
                    <Separator>›</Separator>
                  )}
                </>
              ) : (
                <PathItem
                  parent="true"
                  color="textPrimary"
                >{`${item?.text}`}</PathItem>
              )}
            </React.Fragment>
          );
        })}
        {metricSetStr && (
          <>
            <Separator>--</Separator>
            <PathItem parent="true" color="textPrimary">
              {metricSetStr}
            </PathItem>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(ReportName);
