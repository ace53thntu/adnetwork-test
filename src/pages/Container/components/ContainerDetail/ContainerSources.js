import * as React from 'react';
import {Badge, Tag} from 'antd';
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
import {SOURCE_HEADINGS, SOURCES} from '../ContainerSourcePage/constants';
import {useMemo} from "react";

function ContainerSources(props) {
  const {isFetching, container} = props;
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const countWebsiteTagPages = container?.source?.['web'] ?? 0;
  const countIOSTagPages = container?.source?.['ios'] ?? 0;
  const countAndroidTagPages = container?.source?.['android'] ?? 0;
  const importCount = container?.import_count ?? 0;
  const transferCount = container?.transfer_count ?? 0;

  const sourceTags = useMemo(() => {
    return container?.sources?.map(source => {
      const { pages = [] } = container || {};
      const sourcePages = pages.filter(page => page.source === source);
      let color;
      switch (source) {
        case SOURCES.web: {
          color = "purple";
          break;
        }

        case SOURCES.ios: {
          color = "gold";
          break;
        }

        case SOURCES.android: {
          color = "green";
          break;
        }

        case SOURCES.webtv: {
          color = "magenta";
          break;
        }

        case SOURCES.appletv: {
          color = "cyan";
          break;
        }

        case SOURCES.androidtv: {
          color = "blue";
          break;
        }

        default: {
          color = "purple";
          break;
        }
      }
      return { source, count: sourcePages.length, color }
    });
  }, [container])

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

          {sourceTags && (
            <div className="source-container">
              {sourceTags.map((item, index) => (
                <Badge key={`${item.source}d-${index}`} size="small" count={item.count} offset={[-8, 0]} className="badge-source">
                  <Tag color={item.color} className="tag-source">{SOURCE_HEADINGS[item.source]}</Tag>
                </Badge>
              ))}
            </div>
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
