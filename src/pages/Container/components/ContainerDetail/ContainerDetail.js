//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';

//---> Internal Modules
import {BlockOverlay} from 'components/common';
import {useDispatchSelectContainer} from 'pages/Container/hooks/useDispatchSelectContainer';
import {ContainerBodyLayout} from '../Layouts';
import ContainerForm from './ContainerForm';
import ContainerSources from './ContainerSources';

function ContainerDetail() {
  const {t} = useTranslation();
  const {isFetched, container, error, isError} = useDispatchSelectContainer();
  const [isFetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    if (isFetched) {
      setFetching(false);
    }
  }, [isFetched]);

  return (
    <ContainerBodyLayout
      heading={container?.name ?? t('containerDetail')}
      subHeading={t('containerDescription')}
    >
      {isFetching === 'loading' ? <BlockOverlay /> : null}
      {isError ? (
        <Row>
          <Col>{error?.message ?? 'Something went wrong.'}</Col>
        </Row>
      ) : (
        <Row>
          <Col sm="8">
            <Card>
              <CardHeader>{t('containerInfo')}</CardHeader>
              <CardBody>
                {isFetching ? (
                  'Loading...'
                ) : (
                  <ContainerForm container={container} isEdit />
                )}
              </CardBody>
            </Card>
          </Col>

          <Col sm="4">
            <ContainerSources container={container} isFetching={isFetching} />
          </Col>
        </Row>
      )}
    </ContainerBodyLayout>
  );
}

export default ContainerDetail;
