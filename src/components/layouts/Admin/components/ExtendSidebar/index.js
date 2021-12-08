import React, {useCallback} from 'react';

import './styles.scss';

import {Header, Divider, Content} from './styled';
import {useNavigate} from 'react-router';

export default function ExtendSidebar({
  heading = '',
  children,
  isLink = false,
  path = '',
  classes = ''
}) {
  const navigate = useNavigate();

  const goToPath = useCallback(() => {
    if (path) {
      navigate(path);
    }
  }, [navigate, path]);

  return (
    <div className={`extend-sidebar ${classes}`}>
      {!isLink ? (
        <Header>{heading}</Header>
      ) : (
        <Header onClick={goToPath} style={{cursor: 'pointer'}}>
          {heading}
        </Header>
      )}
      <Divider />
      <Content>{children}</Content>
    </div>
  );
}
