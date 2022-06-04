import {PageTitleAlt} from 'components/layouts/Admin/components';
//---> Internal Modules
import AppContent from 'components/layouts/Admin/components/AppContent';
//---> External Modules
import PropTypes from 'prop-types';
//---> Build-in Modules
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Col, Container, Row} from 'reactstrap';

const propTypes = {
  pageTitle: PropTypes.string
};

const InventoryLayout = ({children, pageTitle = ''}) => {
  const {t} = useTranslation();

  return (
    <>
      <AppContent>
        <PageTitleAlt
          heading={pageTitle || t('inventory')}
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

InventoryLayout.propTypes = propTypes;

export default React.memo(InventoryLayout);
