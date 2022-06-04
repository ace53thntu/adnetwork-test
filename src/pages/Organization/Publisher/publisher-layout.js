import {PageTitleAlt} from 'components/layouts/Admin/components';
//---> Internal Modules
import AppContent from 'components/layouts/Admin/components/AppContent';
//---> Build-in Modules
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
//---> External Modules
import {Col, Container, Row} from 'reactstrap';
import {setSearchTermRedux} from 'store/reducers/publisher';

const PublisherLayout = ({children, pageTitle = ''}) => {
  const reduxDispatch = useDispatch();
  const {t} = useTranslation();

  React.useEffect(() => {
    return function resetSearchTerm(params) {
      reduxDispatch(setSearchTermRedux(''));
    };
  }, [reduxDispatch]);

  return (
    <>
      <AppContent>
        <PageTitleAlt
          heading={pageTitle || t('publisher')}
          subheading={t('managementSegmentDescription')}
          icon="pe-7s-plane icon-gradient bg-tempting-azure"
        />
        <Container fluid>
          <Row>
            <Col md="12">{children}</Col>
          </Row>
        </Container>
      </AppContent>
    </>
  );
};

export default React.memo(PublisherLayout);
