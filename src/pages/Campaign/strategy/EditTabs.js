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
import {FilterAndCappingTab, DescriptionTab} from './strategy-tabs';
import {FormContainer} from './form-container';
import {FormAction} from './form-action';
import {useNavigate} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';
import {Collapse} from 'components/common';
import {Capping} from '../components/capping';
import {CappingReferenceTypes} from '../../../constants/misc';
import {EntityReport} from '../../entity-report';
import {EntityTypes} from '../../../constants/report';
import {USER_ROLE} from '../../user-management/constants';
import {Button} from 'reactstrap';
import {LogTypes} from 'constants/misc';
import Historical from 'components/historical';

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
  const isDescriptionTab = nextTab === 'description' || !nextTab;
  const {t} = useTranslation();
  const [currentTab, setCurrentTab] = useState('description');
  const [openModal, setOpenModal] = React.useState(false);

  const toggleModal = React.useCallback(() => {
    setOpenModal(prevState => !prevState);
  }, []);
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
              <div className="d-flex justify-content-end mb-2">
                <Button color="primary" type="button" onClick={toggleModal}>
                  Logs
                </Button>
              </div>
              <FormContainer {...defaultProps} id="description">
                <StrategyForm
                  campaignId={campaignId}
                  isEdit={!isCreate}
                  currentStrategy={currentStrategy}
                  isDescriptionTab={isDescriptionTab}
                />

                {/* Concept */}
                <Collapse initialOpen title="Concept" unMount={false}>
                  <Concept
                    conceptList={currentStrategy?.concepts}
                    strategyData={currentStrategy}
                  />
                </Collapse>

                <FormAction
                  currentStrategy={currentStrategy}
                  isCreate={isCreate}
                  originalStrategy={defaultProps.originalStrategy}
                />
              </FormContainer>
              {openModal && (
                <Historical
                  modal={openModal}
                  toggle={toggleModal}
                  entityName={currentStrategy?.name}
                  entityUuid={currentStrategy?.uuid}
                  entityType={LogTypes.STRATEGY}
                  hasCapping
                />
              )}
            </DescriptionTab>
          )
        },
        {
          name: t(ViewTabs.CAPPING.name),
          content: (
            <FilterAndCappingTab>
              <FormContainer {...defaultProps} isCapping id="capping">
                <Capping
                  currentStrategy={currentStrategy}
                  referenceUuid={currentStrategy?.uuid}
                  referenceType={CappingReferenceTypes.STRATEGY}
                />
                <FormAction
                  currentStrategy={currentStrategy}
                  isCreate={isCreate}
                  originalStrategy={defaultProps.originalStrategy}
                />
              </FormContainer>
            </FilterAndCappingTab>
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
                    id="entity-report"
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
      t,
      toggleModal,
      defaultProps,
      campaignId,
      isCreate,
      currentStrategy,
      isDescriptionTab,
      openModal,
      ownerId
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
