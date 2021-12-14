import * as React from 'react';

import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledButtonDropdown
} from 'reactstrap';

import {toggleCreatePageModalRedux} from 'store/reducers/container';
import Count from '../ContainerSettings/Count';

function ContainerSources(props) {
  const {isFetching, container} = props;
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const countWebsiteTagPages = container?.source?.['web'] ?? 0;
  const webPageId = container?.source?.['web']?.[0]?.id;
  const countIOSTagPages = container?.source?.['ios'] ?? 0;
  const iosScreenId = container?.source?.['ios']?.[0]?.id;

  const countAndroidTagPages = container?.source?.['android'] ?? 0;
  const androidScreenId = container?.source?.['android']?.[0]?.id;

  const importCount = container?.import_count ?? 0;
  const transferCount = container?.transfer_count ?? 0;
  // because API response data has tag is null

  const onHandleAddPage = () => {
    dispatch(toggleCreatePageModalRedux('web'));
  };
  const onHandleAddScreen = () => {
    dispatch(toggleCreatePageModalRedux('ios'));
  };
  const onHandleAddScreenAndroid = () => {
    dispatch(toggleCreatePageModalRedux('android'));
  };

  return (
    <>
      <Card>
        <CardHeader>{t('containerResources')}</CardHeader>
        <CardBody>
          {isFetching ? (
            'Loading...'
          ) : (
            <>
              <UncontrolledButtonDropdown className="mr-2 mb-2">
                <DropdownToggle caret color="success">
                  {t('addResource')}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={onHandleAddPage}>
                    {t('websiteTracking')}
                  </DropdownItem>
                  <DropdownItem onClick={onHandleAddScreen}>
                    {t('iOSTracking')}
                  </DropdownItem>
                  <DropdownItem onClick={onHandleAddScreenAndroid}>
                    {t('androidTracking')}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>

              <Row>
                {countWebsiteTagPages > 0 ? (
                  <Col sm={12} md={12}>
                    <Link to={`./web/${webPageId}`}>
                      <Count
                        label={t('websiteTag')}
                        count={`${countWebsiteTagPages} page(s)`}
                        className="mb-2"
                      />
                    </Link>
                  </Col>
                ) : null}
                {countIOSTagPages > 0 ? (
                  <Col sm={12} md={12}>
                    <Link to={`./ios/${iosScreenId}`}>
                      <Count
                        label={t('iOSTag')}
                        count={`${countIOSTagPages} screen(s)`}
                        type="success"
                        className="mb-2"
                      />
                    </Link>
                  </Col>
                ) : null}
                {countAndroidTagPages > 0 ? (
                  <Col sm={12} md={12}>
                    <Link to={`./android/${androidScreenId}`}>
                      <Count
                        label={t('androidTag')}
                        count={`${countAndroidTagPages} screen(s)`}
                        type="warning"
                        className="mb-2"
                      />
                    </Link>
                  </Col>
                ) : null}
                {importCount > 0 ? (
                  <Col sm={12} md={12}>
                    <Link to="./import">
                      <Count
                        label={'Manual Import'}
                        count={`${importCount} file(s)`}
                        type="danger"
                        className="mb-2"
                      />
                    </Link>
                  </Col>
                ) : null}

                {transferCount > 0 ? (
                  <Col sm={12} md={12}>
                    <Link to="./transfer">
                      <Count
                        label={'Manual Import'}
                        count={`${transferCount} transfer(s)`}
                        type="info"
                        className="mb-2"
                      />
                    </Link>
                  </Col>
                ) : null}
              </Row>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
}

ContainerSources.propTypes = {
  isFetching: PropTypes.bool,
  container: PropTypes.any
};
ContainerSources.defaultProps = {
  isFetching: true
};

export default ContainerSources;
