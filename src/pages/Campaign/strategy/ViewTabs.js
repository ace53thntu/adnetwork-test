//---> Build-in Modules
import React, {useCallback, useMemo, useState} from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Link, useParams} from 'react-router-dom';
import {Button} from 'reactstrap';

//---> Internal Modules
import {RoutePaths} from 'constants/route-paths';
import {useQueryString} from 'hooks';
import {EntityReport} from 'pages/entity-report';
import {Capping} from '../components/capping';

import {Tabs} from '../components';
import StrategyForm from './form';
import Concept from './form-fields/Concept';
import {StrategyViewTabs as ViewTabs} from '../constants';
import {EntityTypes} from 'constants/report';
import {USER_ROLE} from 'pages/user-management/constants';
import {DescriptionTab} from './strategy-tabs';
import {FormContainer} from './form-container';
import {FormAction} from './form-action';
import {CollapseBox} from 'components/common';
import {CappingReferenceTypes} from 'constants/misc';
// import Audience from './form-fields/Audience';

const propTypes = {
  currentStrategy: PropTypes.object,
  campaignId: PropTypes.string
};

const StrategyViewTabs = ({currentStrategy = {}, campaignId}) => {
  console.log(
    '🚀 ~ file: ViewTabs.js ~ line 35 ~ StrategyViewTabs ~ currentStrategy',
    currentStrategy,
    currentStrategy.uuid
  );
  const {t} = useTranslation();
  const query = useQueryString();
  const ownerId = query.get('advertiser_id');
  const {strategyId} = useParams();
  const strategyEditPath = `/${RoutePaths.CAMPAIGN}/${campaignId}/${RoutePaths.STRATEGY}/${strategyId}/${RoutePaths.EDIT}?advertiser_id=${ownerId}`;
  const [currentTab, setCurrentTab] = useState('description');
  const goTo = useCallback(({nextTab}) => {
    setCurrentTab(nextTab);
  }, []);

  const defaultProps = React.useMemo(
    () => ({
      isEdit: true,
      currentStrategy,
      goTo
    }),
    [currentStrategy, goTo]
  );

  const tabDetail = useMemo(
    () =>
      [
        {
          name: t('description'),
          content: (
            <>
              <DescriptionTab>
                <FormContainer {...defaultProps}>
                  <StrategyForm
                    campaignId={campaignId}
                    isView
                    currentStrategy={currentStrategy}
                  />
                  {/* <Divider text="Audience"></Divider> */}
                  {/* <Audience
                goTo={goTo}
                listAudiences={[]}
                dataStrategy={currentStrategy}
                isView
              /> */}
                  <CollapseBox unMoun={false} open title={t('concepts')}>
                    <Concept
                      conceptList={currentStrategy?.concepts}
                      isView
                      strategyData={currentStrategy}
                    />
                  </CollapseBox>
                  <div style={{textAlign: 'right'}}>
                    <Link to={strategyEditPath}>
                      <Button color="link">{t('goToEdit')}</Button>
                    </Link>
                  </div>
                  <FormAction isView />
                </FormContainer>
              </DescriptionTab>
            </>
          )
        },
        {
          name: t(ViewTabs.CAPPING.name),
          content: (
            <Capping
              referenceUuid={currentStrategy?.uuid}
              referenceType={CappingReferenceTypes.STRATEGY}
            />
          )
        },
        {
          name: t(ViewTabs.REPORT.name),
          content: (
            <EntityReport
              entity={EntityTypes.STRATEGY}
              entityId={currentStrategy?.uuid}
              ownerId={ownerId}
              ownerRole={USER_ROLE.ADVERTISER}
            />
          )
        }
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [campaignId, currentStrategy, defaultProps, ownerId, strategyEditPath, t]
  );

  const getTab = index => {
    switch (index) {
      case ViewTabs.DESCRIPTION.value:
        setCurrentTab(ViewTabs.DESCRIPTION.name);
        break;
      case ViewTabs.CAPPING.value:
        setCurrentTab(ViewTabs.CAPPING.name);
        break;
      case ViewTabs.REPORT.value:
        setCurrentTab(ViewTabs.REPORT.name);
        break;
      default:
        setCurrentTab(ViewTabs.DESCRIPTION.name);
        break;
    }
  };

  const tabPicker = useCallback(() => {
    switch (currentTab) {
      case ViewTabs.DESCRIPTION.name:
        return ViewTabs.DESCRIPTION.value;
      case ViewTabs.CAPPING.name:
        return ViewTabs.CAPPING.value;
      case ViewTabs.REPORT.name:
        return ViewTabs.REPORT.value;
      default:
        return ViewTabs.DESCRIPTION.value;
    }
  }, [currentTab]);

  return <Tabs items={tabDetail} tab={tabPicker} getTab={getTab} />;
};

StrategyViewTabs.propTypes = propTypes;

export default React.memo(StrategyViewTabs);
