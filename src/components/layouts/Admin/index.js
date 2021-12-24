import cx from 'classnames';
import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {useQueryErrorResetBoundary} from 'react-query';
import {useSelector} from 'react-redux';
import useResizeAware from 'react-resize-aware';
import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import {FullPageErrorFallback} from '../FullPageErrorFallback/FullPageErrorFallback';
import {AppHeader, AppSidebar} from './components';

const AdminLayout = props => {
  const [resizeListener, sizes] = useResizeAware();
  const {reset} = useQueryErrorResetBoundary();

  const {
    colorScheme,
    enableFixedHeader,
    enableFixedSidebar,
    // enableFixedFooter,
    enableClosedSidebar,
    closedSmallerSidebar,
    enableMobileMenu,
    enablePageTabsAlt
  } = useSelector(state => state.ThemeOptions);

  const isEnable = React.useMemo(
    () => (sizes?.width ? sizes?.width < 1250 : false),
    [sizes]
  );

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback} onReset={reset}>
      <React.Suspense fallback={<div>Loading...</div>}>
        {resizeListener}
        <div
          className={cx(
            'app-container app-theme-' + colorScheme,
            {'fixed-header': enableFixedHeader},
            {
              'fixed-sidebar': enableFixedSidebar || isEnable
            },
            // {'fixed-footer': enableFixedFooter},
            {
              'closed-sidebar': enableClosedSidebar || isEnable
            },
            {
              'closed-sidebar-mobile': closedSmallerSidebar || isEnable
            },
            {'sidebar-mobile-open': enableMobileMenu},
            {'body-tabs-shadow-btn': enablePageTabsAlt}
          )}
        >
          <>
            <AppHeader />

            <div className="app-main">
              <AppSidebar />

              <div
                className={cx('app-main__outer', {
                  'has-closed-sidebar': enableClosedSidebar || isEnable
                })}
              >
                <Outlet />
              </div>
            </div>
          </>
          <ToastContainer autoClose={5000} />
        </div>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default React.memo(AdminLayout);
