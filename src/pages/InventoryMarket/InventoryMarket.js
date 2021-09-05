import {PageTitleAlt} from 'components/layouts/Admin/components';
import React from 'react';
import {Container} from 'reactstrap';

const InventoryMarket = () => {
  return (
    <React.Fragment>
      <PageTitleAlt
        heading={'Inventory Market'}
        subheading=""
        icon="pe-7s-cart icon-gradient bg-tempting-azure"
      />
      <Container fluid>
        <h1>Inventory market</h1>
      </Container>
    </React.Fragment>
  );
};

export default InventoryMarket;
