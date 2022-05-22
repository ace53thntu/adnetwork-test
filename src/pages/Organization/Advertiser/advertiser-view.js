import React from 'react';
import {Link, useParams} from 'react-router-dom';

import Tabs from './components/Tabs';
import {useTranslation} from 'react-i18next';
import {Capping} from './components/capping';
import {FormProvider, useForm} from 'react-hook-form';
import {FormContent} from './components/form-content';
import {useDefaultAdvertiser, useIABsOptions} from '../hooks';
import {useGetAdvertiser} from 'queries/advertiser';
import {useGetIABs} from 'queries/iabs';
import AdvertiserLayout from './advertiser-layout';
import {EntityReport} from 'pages/entity-report';
import {EntityTypes} from 'constants/report';
import {USER_ROLE} from 'pages/user-management/constants';
import {getRole} from 'utils/helpers/auth.helpers';
import {Col, Row} from 'reactstrap';
import Credential from 'components/credential';
import {CappingReferenceTypes} from 'constants/misc';
import {RoutePaths} from 'constants/route-paths';

const AdvertiserView = ({children}) => {
  const {advertiserId} = useParams();
  const {data: advertiserData, isFetched, status} = useGetAdvertiser(
    advertiserId,
    !!advertiserId
  );

  const {data: IABs} = useGetIABs();
  const IABsOptions = useIABsOptions({IABs});
  const defaultValues = useDefaultAdvertiser({
    advertiser: advertiserData,
    iabsArr: IABsOptions
  });

  return isFetched && status === 'success' ? (
    <AdvertiserContent
      defaultValues={defaultValues}
      IABsOptions={IABsOptions}
      advertiserId={advertiserId}
    />
  ) : null;
};

const AdvertiserContent = ({defaultValues, IABsOptions, advertiserId}) => {
  console.log(
    '🚀 ~ file: advertiser-view.js ~ line 41 ~ AdvertiserContent ~ defaultValues',
    defaultValues
  );
  const {t} = useTranslation();
  const role = getRole();

  const methods = useForm({defaultValues});

  const [currentTab, setCurrentTab] = React.useState('description');

  const tabDetail = React.useMemo(
    () =>
      [
        {
          name: t('description'),
          content: (
            <FormProvider {...methods}>
              <form id="advertiserForm">
                <FormContent
                  defaultValues={defaultValues}
                  isView
                  IABsOptions={IABsOptions}
                />

                {(role === USER_ROLE.ADVERTISER ||
                  role === USER_ROLE.ADMIN) && (
                  <Row className="mt-2">
                    <Col md={12}>
                      <Credential
                        type={USER_ROLE.ADVERTISER}
                        referenceId={advertiserId}
                      />
                    </Col>
                  </Row>
                )}
                <hr />
                <Row className="mt-3">
                  <Col className="d-flex justify-content-end">
                    <Link
                      to={`/${RoutePaths.ORGANIZATION}/${RoutePaths.ADVERTISER}`}
                    >
                      {t('backToList')}
                    </Link>
                    <span className="ml-2">|</span>
                    <Link
                      className="ml-2"
                      to={`/${RoutePaths.ORGANIZATION}/${RoutePaths.ADVERTISER}/${advertiserId}/${RoutePaths.EDIT}`}
                    >
                      {t('edit')}
                    </Link>
                  </Col>
                </Row>
              </form>
            </FormProvider>
          )
        },
        {
          name: t('capping'),
          content: (
            <Capping
              referenceUuid={advertiserId}
              referenceType={CappingReferenceTypes.ADVERTISER}
            />
          )
        },
        {
          name: t('report'),
          content: (
            <EntityReport
              entity={EntityTypes.ADVERTISER}
              entityId={advertiserId}
              ownerId={advertiserId}
              ownerRole={USER_ROLE.ADVERTISER}
              entityName={defaultValues?.name}
            />
          )
        }
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [IABsOptions, advertiserId, defaultValues, methods, role, t]
  );

  const getTab = index => {
    switch (index) {
      case 0:
        setCurrentTab('description');
        break;
      case 1:
        setCurrentTab('capping');
        break;
      case 2:
        setCurrentTab('report');
        break;
      default:
        break;
    }
  };

  const tabPicker = React.useCallback(() => {
    switch (currentTab) {
      case 'description':
        return 0;
      case 'capping':
        return 1;
      case 'report':
        return 2;
      default:
        return 0;
    }
  }, [currentTab]);

  return (
    <AdvertiserLayout pageTitle="Advertiser Details">
      <div>
        <Tabs items={tabDetail} tab={tabPicker} getTab={getTab} />
      </div>
    </AdvertiserLayout>
  );
};

export default React.memo(AdvertiserView);
