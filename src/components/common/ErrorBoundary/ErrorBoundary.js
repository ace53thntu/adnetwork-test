import Loading from 'components/common/loading';
import {FullPageErrorFallback} from 'components/layouts/FullPageErrorFallback/FullPageErrorFallback';
import PropTypes from 'prop-types';
import * as React from 'react';
import {ErrorBoundary as RErrorBoundary} from 'react-error-boundary';

function ErrorBoundary(props) {
  const {children} = props;

  return (
    <RErrorBoundary
      FallbackComponent={FullPageErrorFallback}
      onReset={() => {
        window.location.reload(true);
      }}
    >
      <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
    </RErrorBoundary>
  );
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.any])
};
ErrorBoundary.defaultProps = {};

export default ErrorBoundary;
