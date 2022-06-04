import {LoadingIndicator} from 'components/common';
import {PageTitleAlt} from 'components/layouts/Admin/components';
//---> Internal Modules
import AppContent from 'components/layouts/Admin/components/AppContent';
import {mappingProfileApiToForm} from 'entities/User';
import {useGetMe} from 'queries/users';
//---> Build-in Modules
import React from 'react';
import {useTranslation} from 'react-i18next';
//---> External Modules
import {Col, Container, Row} from 'reactstrap';

import ProfileForm from './ProfileForm';

const propTypes = {};

const UserProfile = () => {
  const {t} = useTranslation();

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
