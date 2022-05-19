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
import {useGetAllPage} from 'queries/page';
import {SOURCES} from '../ContainerSourcePage/constants';

function ContainerSources(props) {
  const {isFetching, container} = props;
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const countWebsiteTagPages = container?.source?.['web'] ?? 0;
  const countIOSTagPages = container?.source?.['ios'] ?? 0;
  const countAndroidTagPages = container?.source?.['android'] ?? 0;
  const importCount = container?.import_count ?? 0;
  const transferCount = container?.transfer_count ?? 0;

  const {data: {items: webPage = []} = {}} = useGetAllPage({
    containerId: container?.uuid,
    enabled: !!container?.uuid && countWebsiteTagPages > 0,
    params: {
      limit: 1,
      source: SOURCES.web
    }
  });
  const {data: {items: iosPage = []} = {}} = useGetAllPage({
    containerId: container?.uuid,
    enabled: !!container?.uuid && countIOSTagPages > 0,
    params: {
      limit: 1,
      source: SOURCES.ios
    }
  });

  const {data: {items: androidPage = []} = {}} = useGetAllPage({
    containerId: container?.uuid,
    enabled: !!container?.uuid && countAndroidTagPages > 0,
    params: {
      limit: 1,
      source: SOURCES.android
    }
  });

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
  const onHandleAddWebTv = () => {
    dispatch(toggleCreatePageModalRedux('webtv'));
  };
  const onHandleAddAppleTv = () => {
    dispatch(toggleCreatePageModalRedux('appletv'));
  };
  const onHandleAddScreenAndroidTv = () => {
    dispatch(toggleCreatePageModalRedux('androidtv'));
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
                  <DropdownItem onClick={onHandleAddWebTv}>
                    {t('COMMON.WEB_TV')}
                  </DropdownItem>
                  <DropdownItem onClick={onHandleAddAppleTv}>
                    {t('COMMON.APPLE_TV')}
                  </DropdownItem>
                  <DropdownItem onClick={onHandleAddScreenAndroidTv}>
                    {t('COMMON.ANDROID_TV')}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>

              <Row>
                {countWebsiteTagPages > 0 ? (
                  <Col sm={12} md={12}>
                    <Link to={`./${SOURCES.web}/${webPage?.[0]?.uuid}`}>
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
                    <Link to={`./${SOURCES.ios}/${iosPage?.[0]?.uuid}`}>
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
                    <Link to={`./${SOURCES.android}/${androidPage?.[0]?.uuid}`}>
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
