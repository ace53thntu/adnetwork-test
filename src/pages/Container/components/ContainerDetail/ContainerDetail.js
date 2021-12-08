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
import {useGetPublisher} from 'queries/publisher';

function ContainerDetail() {
  const {isFetched, container, error, isError} = useDispatchSelectContainer();
  const {data: publisher, isFetched: fetchedPublisher} = useGetPublisher(
    container?.publisher_uuid
  );

  const [isFetching, setFetching] = React.useState(true);

  const {t} = useTranslation();

  React.useEffect(() => {
    if (isFetched && fetchedPublisher) {
      setFetching(false);
    }
  }, [fetchedPublisher, isFetched]);

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
          <Col sm={6}>
            <Card>
              <CardHeader>{t('containerInfo')}</CardHeader>
              <CardBody>
                {isFetching ? (
                  'Loading...'
                ) : (
                  <ContainerForm
                    container={container}
                    publisher={publisher}
                    isEdit
                  />
                )}
              </CardBody>
            </Card>
          </Col>

          <Col sm={6}>
            <ContainerSources container={container} isFetching={isFetching} />
          </Col>
        </Row>
      )}
    </ContainerBodyLayout>
  );
}

export default ContainerDetail;
