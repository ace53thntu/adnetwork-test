//---> Build-in Modules
import React, {useCallback, useEffect, useMemo, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {useQueryString} from 'hooks';
import {StrategyEditTabs as EditTabs} from 'pages/Campaign/constants';
import StrategyForm from './form';
import {Tabs} from '../components';
import Concept from './form-fields/Concept';
import {ConceptTab, DescriptionTab, SummaryTab} from './strategy-tabs';
import {FormContainer} from './form-container';
import {FormAction} from './form-action';
// import Audience from './form-fields/Audience';

const StrategyEditTabs = ({
  currentStrategy = {},
  campaignId,
  positions = []
}) => {
  const query = useQueryString();
  const nextTab = query.get('next_tab');

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
          name: t(EditTabs.DESCRIPTION.name),
          content: (
            <DescriptionTab>
              <FormContainer {...defaultProps}>
                <StrategyForm
                  campaignId={campaignId}
                  isEdit
                  positions={positions}
                  currentStrategy={currentStrategy}
                />
                <FormAction />
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
        {
          name: t(EditTabs.CONCEPT.name),
          content: (
            <ConceptTab>
              <FormContainer {...defaultProps}>
                <Concept goTo={goTo} strategyData={currentStrategy} />
                <FormAction />
              </FormContainer>
            </ConceptTab>
          )
        },
        {
          name: t(EditTabs.SUMMARY.name),
          content: (
            <div>
              <SummaryTab>
                <FormContainer {...{...defaultProps, isSummary: true}}>
                  <StrategyForm
                    campaignId={campaignId}
                    isEdit
                    positions={positions}
                    currentStrategy={currentStrategy}
                  />
                  <Concept goTo={goTo} strategyData={currentStrategy} />
                  <FormAction isSummary />
                </FormContainer>
              </SummaryTab>
            </div>
          )
        }
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [t, defaultProps, campaignId, positions, currentStrategy, goTo]
  );

  const getTab = index => {
    switch (index) {
      case EditTabs.DESCRIPTION.value:
        setCurrentTab(EditTabs.DESCRIPTION.name);
        break;
      case EditTabs.CONCEPT.value:
        setCurrentTab(EditTabs.CONCEPT.name);
        break;
      // case EditTabs.AUDIENCE.value:
      //   setCurrentTab(EditTabs.AUDIENCE.value);
      //   break;
      case EditTabs.SUMMARY.value:
        setCurrentTab(EditTabs.SUMMARY.name);
        break;
      default:
        setCurrentTab(EditTabs.DESCRIPTION.name);
        break;
    }
  };

  const tabPicker = useCallback(() => {
    switch (currentTab) {
      case EditTabs.DESCRIPTION.name:
        return EditTabs.DESCRIPTION.value;
      case EditTabs.CONCEPT.name:
        return EditTabs.CONCEPT.value;
      // case EditTabs.AUDIENCE.name:
      // return EditTabs.AUDIENCE.value;
      case EditTabs.SUMMARY.value:
        return EditTabs.SUMMARY.name;
      default:
        return EditTabs.DESCRIPTION.value;
    }
  }, [currentTab]);

  return <Tabs items={tabDetail} tab={tabPicker} getTab={getTab} />;
};

export default StrategyEditTabs;
