import {useAuth} from 'context/auth/hooks';
import * as React from 'react';
import {Col} from 'reactstrap';

import {LoginForm} from './components/LoginForm';

export function LoginPage(props) {
  const {login} = useAuth();

  return (
    <div className="h-100 bg-plum-plate bg-animation">
      <div className="d-flex h-100 justify-content-center align-items-center">
        <Col md="8" className="mx-auto app-login-box">
          <div className="modal-dialog w-100 mx-auto">
            <LoginForm onLogin={login} />
          </div>
        </Col>
      </div>
    </div>
  );
}

LoginPage.propTypes = {};
LoginPage.defaultProps = {};
