import React from 'react';
import {useParams} from 'react-router-dom';

import DspLayout from './dsp-layout';
import {useGetDsp} from 'queries/dsp';
import Tabs from './components/Tabs';
import {useTranslation} from 'react-i18next';
import {Capping} from './components/capping';
import {FormProvider, useForm} from 'react-hook-form';
import {FormContent} from './components/form-content';
import {useDefaultDsp} from '../hooks';

const DspView = ({children}) => {
  const {dspId} = useParams();
  const {data: dspData, isFetched} = useGetDsp(dspId);
  const defaultValues = useDefaultDsp({
    dspData
  });

  const {t} = useTranslation();
  const methods = useForm({defaultValues});
  const {reset} = methods;

  React.useEffect(() => {
    if (isFetched) {
      reset(defaultValues);
    }
  }, [defaultValues, isFetched, reset]);

  const [currentTab, setCurrentTab] = React.useState('description');

  // const goToTab = React.useCallback(({nextTab, campaignIdCreated}) => {
  //   setCurrentTab(nextTab);
  // }, []);

  const tabDetail = React.useMemo(
    () =>
      [
        {
          name: t('description'),
          content: (
            <FormProvider {...methods}>
              <form id="dspForm">
                <FormContent defaultValues={defaultValues} isView />
              </form>
            </FormProvider>
          )
        },
        {
          name: t('capping'),
          content: <Capping />
        }
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [defaultValues, methods, t]
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
    <DspLayout pageTitle="Dsp Details">
      <div>
        <Tabs items={tabDetail} tab={tabPicker} getTab={getTab} />
      </div>
    </DspLayout>
  );
};

export default React.memo(DspView);
