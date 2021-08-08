import {BlockOverlay} from 'components/common';
import * as React from 'react';
import {Outlet} from 'react-router-dom';

import {Main} from './AuthLayout.styles';

// import PropTypes from 'prop-types';

function AuthLayout(props) {
  return (
    <Main>
      <React.Suspense fallback={<BlockOverlay />}>
        <Outlet />
      </React.Suspense>
    </Main>
  );
}

AuthLayout.propTypes = {};
AuthLayout.defaultProps = {};

export {AuthLayout};
