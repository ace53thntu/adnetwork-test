//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Row, Col, Container} from 'reactstrap';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

//---> Internal Modules
import AppContent from 'components/layouts/Admin/components/AppContent';
import {PageTitleAlt} from 'components/layouts/Admin/components';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import ProfileForm from './ProfileForm';
import {useGetMe} from 'queries/users';
import {mappingProfileApiToForm} from 'entities/User';
import {LoadingIndicator} from 'components/common';

const propTypes = {};

const UserProfile = () => {
  const reduxDispatch = useDispatch();
  const {t} = useTranslation();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(false));
  }, [reduxDispatch]);

  const {data, isFetching, isFetched} = useGetMe({enable: true});
  const userData = React.useMemo(
    () => mappingProfileApiToForm({apiRes: data}),
    [data]
  );

  return (
    <>
      <AppContent>
        <PageTitleAlt
          heading={t('profile')}
          subheading=""
          icon="pe-7s-plane icon-gradient bg-tempting-azure"
        />
        <Container fluid>
          {isFetching && <LoadingIndicator />}
          {isFetched && (
            <Row>
              <Col md="12">
                <ProfileForm userData={userData} rawData={data} />
              </Col>
            </Row>
          )}
        </Container>
      </AppContent>
    </>
  );
};

UserProfile.propTypes = propTypes;

export default React.memo(UserProfile);
