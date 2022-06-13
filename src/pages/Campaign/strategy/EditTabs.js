//---> Build-in Modules
import React, {useCallback, useEffect, useMemo, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {useQueryString} from 'hooks';
import {
  StrategyEditTabs as EditTabs,
  StrategyViewTabs as ViewTabs
} from 'pages/Campaign/constants';
import StrategyForm from './form';
import {Tabs} from '../components';
import Concept from './form-fields/Concept';
import {FilterAndCappingTab, DescriptionTab, SummaryTab} from './strategy-tabs';
import {FormContainer} from './form-container';
import {FormAction} from './form-action';
import {useNavigate} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';
import {Collapse} from 'components/common';
import {Capping} from '../components/capping';
import {CappingReferenceTypes} from '../../../constants/misc';
import GeneralFilter from './form-fields/GeneralFilter';
import VideoFilterGroup from './form-fields/VideoFilterGroup';
import ContextFilterGroup from './form-fields/ContextFilterGroup';
import {EntityReport} from '../../entity-report';
import {EntityTypes} from '../../../constants/report';
import {USER_ROLE} from '../../user-management/constants';
// import Audience from './form-fields/Audience';

const StrategyEditTabs = ({
  currentStrategy = {},
  campaignId,
  isCreate = false,
  concepts,
  originalStrategy
}) => {
  const navigate = useNavigate();
  const query = useQueryString();
  const ownerId = query.get('advertiser_id');
  const nextTab = query.get('next_tab');
  const isDescriptionTab = nextTab === 'description';
  const {t} = useTranslation();
  const [currentTab, setCurrentTab] = useState('description');

  const goTo = useCallback(({nextTab}) => {
    setCurrentTab(nextTab);
  }, []);

  useEffect(() => {
    if (nextTab) {
      goTo({nextTab});
    }
  }, [goTo, nextTab]);

  const defaultProps = React.useMemo(
    () => ({
      isEdit: !isCreate,
      currentStrategy,
      goTo,
      originalStrategy
    }),
    [currentStrategy, goTo, isCreate, originalStrategy]
  );

  const tabDetail = useMemo(
    () =>
      [
        {
          name: t(EditTabs.DESCRIPTION.name),
          content: (
            <DescriptionTab>
              <FormContainer {...defaultProps}>
                <StrategyForm
                  campaignId={campaignId}
                  isEdit={!isCreate}
                  currentStrategy={currentStrategy}
                  isDescriptionTab={isDescriptionTab}
                />

                {/* Concept */}
                <Collapse initialOpen title="Concept" unMount={false}>
                  <Concept strategyData={currentStrategy} />
                </Collapse>

                <FormAction
                  currentStrategy={currentStrategy}
                  isCreate={isCreate}
                />
              </FormContainer>
            </DescriptionTab>
          )
        },
        // {
        //   name: 'Audience',
        //   content: (
        //     <div>
        //       <Audience
        //         listAudiences={[]}
        //         goTo={goTo}
        //         currentStrategy={currentStrategy}
        //       />
        //     </div>
        //   )
        // },
        /*        {
          name: t(EditTabs.CONCEPT.name),
          content: (
            <ConceptTab>
              <FormContainer {...defaultProps} isConcept>
                <Concept goTo={goTo} strategyData={currentStrategy} />
                <FormAction currentStrategy={currentStrategy} />
              </FormContainer>
            </ConceptTab>
          )
        },*/
        {
          name: t(ViewTabs.CAPPING.name),
          content: (
            <FilterAndCappingTab>
              <FormContainer {...defaultProps} isCapping>
                <Capping
                  currentStrategy={currentStrategy}
                  referenceUuid={currentStrategy?.uuid}
                  referenceType={CappingReferenceTypes.STRATEGY}
                />
                <FormAction
                  currentStrategy={currentStrategy}
                  isCreate={isCreate}
                />
              </FormContainer>
            </FilterAndCappingTab>
          )
        },
        {
          name: t(EditTabs.SUMMARY.name),
          content: (
            <SummaryTab>
              <FormContainer {...defaultProps} isSummary>
                <StrategyForm
                  campaignId={campaignId}
                  isEdit={!isCreate}
                  currentStrategy={currentStrategy}
                />

                <GeneralFilter currentStrategy={currentStrategy} />

                {/* Video filter */}
                <VideoFilterGroup currentStrategy={currentStrategy} />

                {/* Context filter */}
                <ContextFilterGroup currentStrategy={currentStrategy} />

                <Collapse title={t('concepts')} initialOpen unMount={false}>
                  <Concept goTo={goTo} strategyData={currentStrategy} />
                </Collapse>

                <FormAction isSummary currentStrategy={currentStrategy} />
              </FormContainer>
            </SummaryTab>
          )
        },
        ...(!isCreate
          ? [
              {
                name: t(EditTabs.REPORT.name),
                content: (
                  <EntityReport
                    entity={EntityTypes.STRATEGY}
                    entityName={currentStrategy?.name}
                    parentPath={`${currentStrategy?.advertiser_name}/${currentStrategy?.campaign_uuid?.label}`}
                    entityId={currentStrategy?.uuid}
                    ownerId={ownerId}
                    ownerRole={USER_ROLE.ADVERTISER}
                  />
                )
              }
            ]
          : [])
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [
      defaultProps,
      campaignId,
      isCreate,
      currentStrategy,
      goTo,
      isDescriptionTab
    ]
  );

  const getTab = index => {
    const url = `/${RoutePaths.CAMPAIGN}/${campaignId}/${RoutePaths.STRATEGY}/${currentStrategy?.uuid}/${RoutePaths.EDIT}?advertiser_id=${currentStrategy?.advertiser_uuid}&next_tab=`;
    switch (index) {
      case EditTabs.DESCRIPTION.value:
        // setCurrentTab(EditTabs.DESCRIPTION.name);
        navigate(`${url}${EditTabs.DESCRIPTION.name}`);
        break;
      case EditTabs.FILTER_CAPPING.value:
        // setCurrentTab(EditTabs.CONCEPT.name);
        navigate(`${url}${EditTabs.FILTER_CAPPING.name}`);

        break;
      // case EditTabs.AUDIENCE.value:
      //   setCurrentTab(EditTabs.AUDIENCE.value);
      //   break;
      case EditTabs.SUMMARY.value:
        // setCurrentTab(EditTabs.SUMMARY.name);
        navigate(`${url}${EditTabs.SUMMARY.name}`);
      case EditTabs.REPORT.value:
        setCurrentTab(EditTabs.REPORT.name);
        break;
      default:
        // setCurrentTab(EditTabs.DESCRIPTION.name);
        navigate(`${url}${EditTabs.DESCRIPTION.name}`);
        break;
    }
  };

  const tabPicker = useCallback(() => {
    switch (currentTab) {
      case EditTabs.DESCRIPTION.name:
        return EditTabs.DESCRIPTION.value;
      case EditTabs.FILTER_CAPPING.name:
        return EditTabs.FILTER_CAPPING.value;
      // case EditTabs.AUDIENCE.name:
      // return EditTabs.AUDIENCE.value;
      case EditTabs.SUMMARY.name:
        return EditTabs.SUMMARY.value;
      case EditTabs.REPORT.name:
        return EditTabs.REPORT.value;
      default:
        return EditTabs.DESCRIPTION.value;
    }
  }, [currentTab]);

  return (
    <Tabs
      items={tabDetail}
      tab={tabPicker}
      getTab={getTab}
      isCreate={isCreate}
    />
  );
};

export default StrategyEditTabs;
