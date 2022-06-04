import {Button} from 'antd';
import {PageTitleAlt} from 'components/layouts/Admin/components';
import PropTypes from 'prop-types';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {Col, Container, Row} from 'reactstrap';

import TreeSelectCreative from '../TreeSelectCreative';

function CreativeBodyLayout(props) {
  const {children, heading} = props;
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {advertiserId, conceptId} = useParams();
  const isAdvertiserListPage = advertiserId && !conceptId;

  return (
    <>
      <PageTitleAlt
        heading={heading}
        icon="pe-7s-glasses icon-gradient bg-love-kiss"
      />
      <Container fluid>
        <Row>
          <TreeSelectCreative />
          {isAdvertiserListPage && (
            <Button type="primary" onClick={() => navigate('create')}>
              {t('createNew')}
            </Button>
          )}
        </Row>

        <Row>
          <Col sm={12}>{children}</Col>
        </Row>
      </Container>
    </>
  );
}

CreativeBodyLayout.propTypes = {
  heading: PropTypes.string
};
CreativeBodyLayout.defaultProps = {
  heading: ''
};

export default CreativeBodyLayout;
