import './i18n';

import {ScrollReset} from 'components/common';
import React from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {HashRouter as Router} from 'react-router-dom';
import {DefaultTheme as theme} from 'theme';

import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';

import {AuthProvider} from './auth/provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      // refetchOnMount: false,
      refetchOnWindowFocus: false
    },
    mutations: {
      useErrorBoundary: false
    }
  }
});

function RootProvider({children}) {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={theme}>
        <HelmetProvider>
          <ScrollReset />
          <Router>
            <AuthProvider>{children}</AuthProvider>
          </Router>
        </HelmetProvider>
      </MuiThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export {RootProvider};
