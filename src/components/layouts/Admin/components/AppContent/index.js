import {Box} from '@material-ui/core';
import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

export default function AppContent({children, noPadding = true}) {
  return (
    <div
      className="app-main__inner"
      style={
        noPadding
          ? {
              padding: 0
            }
          : {}
      }
    >
      <CSSTransition timeout={200} classNames="TabsAnimation">
        <Box>{children}</Box>
      </CSSTransition>
    </div>
  );
}
