//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

//---> Internal Modules
import AppContent from 'components/layouts/Admin/components/AppContent';
import { PageTitleAlt } from 'components/layouts/Admin/components';
import { setSearchTermRedux } from 'store/reducers/advertiser';

const propTypes = {
  pageTitle: PropTypes.string
};

const AdvertiserLayout = ({ children, pageTitle = '' }) => {
  const reduxDispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    return function resetSearchTerm(params) {
      reduxDispatch(setSearchTermRedux(''));
    };
  }, [reduxDispatch]);

  return (
    <>
      <AppContent>
        <PageTitleAlt
          heading={pageTitle || t('advertiser')}
          subheading=""
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

AdvertiserLayout.propTypes = propTypes;

export default React.memo(AdvertiserLayout);
