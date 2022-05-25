import {PageTitleAlt} from 'components/layouts/Admin/components';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Col, Container, Row} from 'reactstrap';
import TreeSelectCreative from "../TreeSelectCreative";
import {Button} from "antd";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

function CreativeBodyLayout(props) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {children, heading} = props;

  return (
    <>
      <PageTitleAlt
        heading={heading}
        icon="pe-7s-glasses icon-gradient bg-love-kiss"
      />
      <Container fluid>
        <Row>
          <TreeSelectCreative />
          <Button type="primary" onClick={() => navigate("create")}>{t('createNew')}</Button>
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
