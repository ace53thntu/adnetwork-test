//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'reactstrap';
import {useDispatch} from 'react-redux';

//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';

const propTypes = {
  pageTitle: PropTypes.string,
};

const TrackerTemplateLayout = ({children, pageTitle = ''}) => {
  const reduxDispatch = useDispatch();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(false));
  }, [reduxDispatch]);

  return (
    <AppContent>
      <PageTitleAlt
        heading={pageTitle}
        subheading=""
        icon="pe-7s-map-2 icon-gradient bg-tempting-azure"
      />
      <Container fluid>
        <Row>
          <Col md="12">{children}</Col>
        </Row>
      </Container>
    </AppContent>
  );
};

TrackerTemplateLayout.propTypes = propTypes;

export default TrackerTemplateLayout;
