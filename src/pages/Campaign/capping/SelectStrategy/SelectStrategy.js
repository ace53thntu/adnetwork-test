import React, {useMemo} from 'react';
import {Forms} from 'components';
import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';

const useGetStrategyOptions = (strategies = []) => {
  return useMemo(() => {
    return strategies.map(item => {
      return {value: item?.id, label: item?.name};
    });
  }, [strategies]);
};

const SelectStrategy = () => {
  const {t} = useTranslation();
  const {watch} = useFormContext();
  const selectedCampaing = watch('campaign');
  const strategyOptions = useGetStrategyOptions(selectedCampaing?.strategies);

  return (
    <Forms.FormReactSelect
      required
      name="strategy"
      label={t('strategy')}
      placeholder={'Select'}
      options={strategyOptions}
    />
  );
};

export default SelectStrategy;
