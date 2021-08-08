import {ButtonLoading, ErrorText} from 'components/common';
import {TextField} from 'components/forms';
import PropTypes from 'prop-types';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

import {loginFormResolver} from './validations';

const defaultValues = {
  email: '',
  password: ''
};

function LoginForm(props) {
  const {onLogin} = props;

  const {t} = useTranslation();
  const methods = useForm({
    defaultValues,
    resolver: loginFormResolver()
  });
  const {
    handleSubmit,
    formState: {isDirty}
  } = methods;

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const onSubmit = values => {
    onLogin({...values, setIsLoading, setError});
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-content">
          <div className="modal-body">
            <div className="h5 modal-title text-center">
              <h4 className="mt-2">
                <div>{t('welcomeBack')}</div>
                <span>{t('signInDescription')}</span>
              </h4>
            </div>

            <div>
              {error ? (
                <ErrorText message={error || 'Your account is invalid'} />
              ) : null}
            </div>
            <div>
              <Row form>
                <Col md={12}>
                  <TextField
                    isRequired
                    name="email"
                    disabled={isLoading}
                    placeholder={t('email')}
                  />
                </Col>
                <Col md={12}>
                  <TextField
                    isRequired
                    type="password"
                    name="password"
                    disabled={isLoading}
                    placeholder={t('password')}
                    defaultValue={defaultValues.password}
                  />
                </Col>
              </Row>
            </div>
          </div>
          <div className="modal-footer clearfix">
            <div className="float-right">
              <ButtonLoading
                type="submit"
                loading={isLoading}
                disabled={!isDirty}
              >
                {t('login')}
              </ButtonLoading>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func
};
LoginForm.defaultProps = {
  onLogin: () => {}
};

export {LoginForm};
