import {PageTitleAlt} from 'components/layouts/Admin/components';
//---> Internal Modules
import AppContent from 'components/layouts/Admin/components/AppContent';
//---> External Modules
import PropTypes from 'prop-types';
//---> Build-in Modules
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Col, Container, Row} from 'reactstrap';
import {setSearchTermRedux} from 'store/reducers/advertiser';

const propTypes = {
  pageTitle: PropTypes.string
};

const AdvertiserLayout = ({children, pageTitle = ''}) => {
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
