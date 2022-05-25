import {PageTitleAlt} from 'components/layouts/Admin/components';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Col, Container, Row} from 'reactstrap';
import TreeSelectCampaign from "../components/TreeSelectCampaign";
import {useCampaignSelector} from "../../../store/reducers/campaign";

const propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  children: PropTypes.node
};

function CampaignContentLayout(props) {
  const { selectedTreeNodeCampaign } = useCampaignSelector();
  const {
    children,
    heading = '',
    subHeading = '',
    actionPageTitle = null
  } = props;

  //
  const { name: advertiserName } = selectedTreeNodeCampaign || {};
  const campaignTitle = advertiserName || heading;

  return (
    <>
      <PageTitleAlt
        icon="pe-7s-network icon-gradient bg-tempting-azure"
        heading={campaignTitle}
        subheading={subHeading}
        {...actionPageTitle}
      />
      <Container fluid>
        <div style={{paddingLeft: "15px" }} className="mb-3">
          <TreeSelectCampaign />
        </div>

        <Row>
          <Col sm={12}>{children}</Col>
        </Row>
      </Container>
    </>
  );
}

CampaignContentLayout.propTypes = propTypes;

export default CampaignContentLayout;
