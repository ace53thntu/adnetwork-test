import React from 'react';

//---> External Modules
import {Badge, CardBody, CardHeader, Row, Button} from 'reactstrap';
import {useParams} from 'react-router';
import moment from 'moment';

//---> Internal Modules
import {BackToHomeButton, CardStyled} from './styled';
import DetailItem from './detail-item';
import {useGetAudience} from 'queries/audience';
import {LoadingIndicator} from 'components/common';
import {RoutePaths} from 'constants/route-paths';
import DeliveryHistories from './delivery-histories';

//---> Define prop types
const propTypes = {};

const AudienceDetail = props => {
  const {id: audienceId} = useParams();
  const {data: audience = {}, isLoading} = useGetAudience({
    audienceId,
    enabled: !!audienceId
  });

  const {
    audience_name,
    role,
    audience_type,
    sender_code,
    vendor_code,
    start_date,
    last_transfer_date
  } = audience;
  const destructureAudience = {
    role: role ? <Badge color="success">{role}</Badge> : '',
    audience_type,
    sender_code,
    vendor_code: vendor_code ? <Badge>{vendor_code}</Badge> : '',
    start_date: start_date ? moment(start_date).format('DD/MM/YYYY') : '',
    last_transfer_date: last_transfer_date
      ? moment(last_transfer_date).format('DD/MM/YYYY')
      : ''
  };

  return (
    <CardStyled>
      {isLoading && <LoadingIndicator />}
      <CardHeader>
        Audience name: {audience_name}{' '}
        <BackToHomeButton to={`/${RoutePaths.AUDIENCE}`}>
          <Button color="link">Back to list</Button>
        </BackToHomeButton>
      </CardHeader>
      <CardBody>
        <Row>
          {destructureAudience &&
            Object.entries(destructureAudience)?.map((audienceItem, idx) => {
              const [filedName = '', fieldValue = ''] = audienceItem;

              return (
                <DetailItem
                  key={`pr-${idx}`}
                  label={filedName}
                  value={fieldValue}
                />
              );
            })}
        </Row>
        <DeliveryHistories audienceUuid={audienceId} />
      </CardBody>
    </CardStyled>
  );
};

AudienceDetail.propTypes = propTypes;

export default React.memo(AudienceDetail);
