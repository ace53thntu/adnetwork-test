import Loading from 'components/common/loading';
import {FullPageErrorFallback} from 'components/layouts/FullPageErrorFallback/FullPageErrorFallback';
import PropTypes from 'prop-types';
import * as React from 'react';
import {ErrorBoundary as RErrorBoundary} from 'react-error-boundary';
import {useQueryErrorResetBoundary} from 'react-query';

function ErrorBoundary(props) {
  const {children} = props;
  const {reset} = useQueryErrorResetBoundary();

  return (
    <RErrorBoundary FallbackComponent={FullPageErrorFallback} onReset={reset}>
      <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
    </RErrorBoundary>
  );
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.any])
};
ErrorBoundary.defaultProps = {};

export default ErrorBoundary;
