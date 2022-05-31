//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useParams} from 'react-router-dom';

//---> Internal Modules
import {useGetPublisher} from 'queries/publisher';
import {PublisherForm} from './components';
import {LoadingIndicator} from 'components/common';
import PublisherLayout from './publisher-layout';
import {useTranslation} from 'react-i18next';
import {EntityReport} from 'pages/entity-report';
import {EntityTypes} from 'constants/report';
import {USER_ROLE} from 'pages/user-management/constants';
import {Tabs} from 'pages/Campaign/components';

const TabIndex = {
  DESCRIPTION: 0,
  REPORT: 1
};

const TabName = {
  DESCRIPTION: 'description',
  REPORT: 'report'
};

const propTypes = {};

const PublisherView = () => {
  const {publisherId} = useParams();
  const {data: publisher, isFetched, status, isLoading} = useGetPublisher(
    publisherId,
    !!publisherId
  );

  return (
    <PublisherLayout pageTitle="Publisher details">
      <div>
        {isLoading && <LoadingIndicator />}
        {isFetched && status === 'success' && (
          <PublisherContent publisher={publisher} publisherId={publisherId} />
        )}
      </div>
    </PublisherLayout>
  );
};

const PublisherContent = ({publisher, publisherId}) => {
  const {t} = useTranslation();

  const [currentTab, setCurrentTab] = React.useState('description');

  const tabDetail = React.useMemo(
    () =>
      [
        {
          name: t('description'),
          content: <PublisherForm publisher={publisher} isView />
        },
        {
          name: t('report'),
          content: (
            <EntityReport
              entity={EntityTypes.PUBLISHER}
              entityId={publisherId}
              ownerId={publisherId}
              ownerRole={USER_ROLE.PUBLISHER}
              entityName={publisher?.name}
            />
          )
        }
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [publisherId, publisher, t]
  );

  const getTab = index => {
    switch (index) {
      case TabIndex.DESCRIPTION:
        setCurrentTab(TabName.DESCRIPTION);
        break;
      case TabIndex.REPORT:
        setCurrentTab(TabName.REPORT);
        break;
      default:
        setCurrentTab(TabName.DESCRIPTION);
        break;
    }
  };

  const tabPicker = React.useCallback(() => {
    switch (currentTab) {
      case TabName.DESCRIPTION:
        return TabIndex.DESCRIPTION;
      case TabName.REPORT:
        return TabIndex.REPORT;
      default:
        return TabIndex.DESCRIPTION;
    }
  }, [currentTab]);

  return <Tabs items={tabDetail} tab={tabPicker} getTab={getTab} />;
};

PublisherView.propTypes = propTypes;

export default PublisherView;
