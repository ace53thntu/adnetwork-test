import React from 'react';
import {useParams} from 'react-router-dom';

import Tabs from './components/Tabs';
import {useTranslation} from 'react-i18next';
import {Capping} from './components/capping';
import {FormProvider, useForm} from 'react-hook-form';
import {FormContent} from './components/form-content';
import {useDefaultAdvertiser, useIABsOptions} from '../hooks';
import {useGetAdvertiser} from 'queries/advertiser';
import {useGetIABs} from 'queries/iabs';
import AdvertiserLayout from './advertiser-layout';

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
              <form id="advertiserForm">
                <FormContent
                  defaultValues={defaultValues}
                  isView
                  IABsOptions={IABsOptions}
                />
              </form>
            </FormProvider>
          )
        },
        {
          name: t('capping'),
          content: (
            <Capping referenceUuid={advertiserId} referenceType="advertiser" />
          )
        }
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [IABsOptions, advertiserId, defaultValues, methods, t]
  );

  const getTab = index => {
    switch (index) {
      case 0:
        setCurrentTab('description');
        break;
      case 1:
        setCurrentTab('capping');
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
