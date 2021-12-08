import React, {useCallback, useState} from 'react';
import {
  Card,
  CardBody,
  Row,
  Col,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
  Modal
} from 'reactstrap';
import {useTranslation} from 'react-i18next';

import {Count} from '../ContainerWebsiteTag/CompletedTab';
import CreatePage from '../ContainerWebsiteTag/CreatePage';

function ContainerResources({
  hasWebsiteTag,
  hasIOSTag,
  countWebsiteTagPages,
  countIOSTagPages,
  countAndroidTagPages,
  hasAndroidTag = false,
  importCount = 0,
  transferCount = 0
}) {
  const {t} = useTranslation();
  const [isOpenCreatePage, setIsOpenCreatePage] = useState(false);
  const [source, setSource] = useState('web');
  // const navigate = useNavigate();

  const toggleDialog = useCallback(() => {
    setIsOpenCreatePage(!isOpenCreatePage);
    setSource('web');
  }, [isOpenCreatePage]);

  const onHandleAddPage = useCallback(() => {
    setIsOpenCreatePage(true);
  }, []);

  const onHandleAddScreen = useCallback(() => {
    setIsOpenCreatePage(true);
    setSource('ios');
  }, []);

  const onHandleAddScreenAndroid = useCallback(() => {
    setIsOpenCreatePage(true);
    setSource('android');
  }, []);

  return (
    <Card>
      <CardHeader>{t('containerResources')}</CardHeader>
      <CardBody>
        <UncontrolledButtonDropdown className="mr-2 mb-2">
          <DropdownToggle caret color="success">
            {t('addResource')}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem disabled={hasWebsiteTag} onClick={onHandleAddPage}>
              {t('websiteTracking')}
            </DropdownItem>
            <DropdownItem disabled={hasIOSTag} onClick={onHandleAddScreen}>
              {t('iOSTracking')}
            </DropdownItem>
            <DropdownItem
              disabled={hasAndroidTag}
              onClick={onHandleAddScreenAndroid}
            >
              {t('androidTracking')}
            </DropdownItem>
            {/* <DropdownItem
              disabled={importCount > 0}
              onClick={() => navigate('import-offline/create')}
            >
              {t('manualImportation')}
            </DropdownItem>
            <DropdownItem
              disabled={transferCount > 0}
              onClick={() => navigate('transfer-files/create')}
            >
              {t('scheduleTransfer')}
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <Row>
          {hasWebsiteTag ? (
            <Col sm={12} md={12}>
              <Count
                label={t('websiteTag')}
                count={`${countWebsiteTagPages} page(s)`}
                className="mb-2"
              />
            </Col>
          ) : null}
          {hasIOSTag ? (
            <Col sm={12} md={12}>
              <Count
                label={t('iOSTag')}
                count={`${countIOSTagPages} screen(s)`}
                type="success"
                className="mb-2"
              />
            </Col>
          ) : null}
          {hasAndroidTag ? (
            <Col sm={12} md={12}>
              <Count
                label={t('androidTag')}
                count={`${countAndroidTagPages} screen(s)`}
                type="warning"
                className="mb-2"
              />
            </Col>
          ) : null}
          {importCount > 0 ? (
            <Col sm={12} md={12}>
              <Count
                label={'Manual Import'}
                count={`${importCount} file(s)`}
                type="danger"
                className="mb-2"
              />
            </Col>
          ) : null}

          {transferCount > 0 ? (
            <Col sm={12} md={12}>
              <Count
                label={'Manual Import'}
                count={`${transferCount} transfer(s)`}
                type="info"
                className="mb-2"
              />
            </Col>
          ) : null}
        </Row>
      </CardBody>

      <Modal unmountOnClose isOpen={isOpenCreatePage}>
        <CreatContaePage toggle={toggleDialog} source={source} />
      </Modal>
    </Card>
  );
}

export default ContainerResources;
