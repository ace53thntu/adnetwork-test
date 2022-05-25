import React from 'react';
import {Link, useParams} from 'react-router-dom';

import DspLayout from './dsp-layout';
import {useGetDsp} from 'queries/dsp';
import Tabs from './components/Tabs';
import {useTranslation} from 'react-i18next';
import {Capping} from './components/capping';
import {FormProvider, useForm} from 'react-hook-form';
import {FormContent} from './components/form-content';
import {useDefaultDsp} from '../hooks';
import {RoutePaths} from 'constants/route-paths';
import {USER_ROLE} from 'pages/user-management/constants';
import {Col, Row} from 'reactstrap';
import Credential from 'components/credential';
import {getRole} from 'utils/helpers/auth.helpers';
import {LoadingIndicator} from 'components/common';
// import {EntityReport} from 'pages/entity-report';
// import {EntityTypes} from 'constants/report';
// import {USER_ROLE} from 'pages/user-management/constants';

/**
 * @enum
 */
const DspTabIndex = {
  DESCRIPTION: 0,
  CAPPING: 1,
  REPORT: 2
};

/**
 * @enum
 */
const DspTabName = {
  DESCRIPTION: 'description',
  CAPPING: 'capping',
  REPORT: 'report'
};

const DspView = ({children}) => {
  const role = getRole();
  const {dspId} = useParams();
  const {data: dspData, isFetching} = useGetDsp(dspId, !!dspId);

  return (
    <DspLayout pageTitle="Dsp Details">
      <div>
        {isFetching && <LoadingIndicator />}
        {dspData && (
          <DspTabContent dspId={dspId} dspData={dspData} role={role} />
        )}
      </div>
    </DspLayout>
  );
};

const DspTabContent = ({dspId, dspData, role}) => {
  const defaultValues = useDefaultDsp({
    dspData
  });

  const {t} = useTranslation();
  const methods = useForm({defaultValues});

  const [currentTab, setCurrentTab] = React.useState('description');

  const tabDetail = React.useMemo(
    () =>
      [
        {
          name: t('description'),
          content: (
            <FormProvider {...methods}>
              <form id="dspForm">
                <FormContent defaultValues={defaultValues} isView />
                {(role === USER_ROLE.DSP || role === USER_ROLE.ADMIN) && (
                  <Row>
                    <Col md={12}>
                      <Credential type={USER_ROLE.DSP} referenceId={dspId} />
                    </Col>
                  </Row>
                )}
                <hr />
                <div className="d-flex justify-content-end">
                  <Link to={`/${RoutePaths.ORGANIZATION}/${RoutePaths.DSP}`}>
                    {t('backToList')}
                  </Link>
                  <span className="mr-2 ml-2">|</span>
                  <Link
                    to={`/${RoutePaths.ORGANIZATION}/${RoutePaths.DSP}/${dspId}/${RoutePaths.EDIT}`}
                  >
                    {t('COMMON.EDIT')}
                  </Link>
                </div>
              </form>
            </FormProvider>
          )
        },
        {
          name: t('capping'),
          content: <Capping referenceUuid={dspId} referenceType="dsp" />
        }
        // TODO: Will implement later when API is ready
        // {
        //   name: t('report'),
        //   content: (
        //     <EntityReport
        //       entity={EntityTypes.DSP}
        //       entityId={dspId}
        //       ownerId={dspId}
        //       ownerRole={USER_ROLE.DSP}
        //     />
        //   )
        // }
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [defaultValues, dspId, methods, role, t]
  );

  const getTab = index => {
    switch (index) {
      case DspTabIndex.DESCRIPTION:
        setCurrentTab(DspTabName.DESCRIPTION);
        break;
      case DspTabIndex.CAPPING:
        setCurrentTab(DspTabName.CAPPING);
        break;
      case DspTabIndex.REPORT:
        setCurrentTab(DspTabName.REPORT);
        break;
      default:
        break;
    }
  };

  const tabPicker = React.useCallback(() => {
    switch (currentTab) {
      case DspTabName.DESCRIPTION:
        return DspTabIndex.DESCRIPTION;
      case DspTabName.CAPPING:
        return DspTabIndex.CAPPING;
      case DspTabName.REPORT:
        return DspTabIndex.REPORT;
      default:
        return DspTabIndex.DESCRIPTION;
    }
  }, [currentTab]);

  return <Tabs items={tabDetail} tab={tabPicker} getTab={getTab} />;
};

export default React.memo(DspView);
