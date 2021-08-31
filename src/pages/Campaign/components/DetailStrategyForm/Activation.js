//---> Build-in Modules
import React, {useCallback} from 'react';

//---> External Modules
import {useForm, FormProvider} from 'react-hook-form';
import {Button, Form} from 'reactstrap';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {FormReactSelect} from 'components/forms';

//---> Internal Modules

const Activation = ({
  goTo,
  listPlatforms,
  dataStrategy = {},
  setDataStrategy,
  setListErrors
}) => {
  const {t} = useTranslation();
  const optionsPlatforms = listPlatforms.map(item => ({
    name: item.name,
    label: item.name,
    id: item.id
  }));

  const defaultPlatform =
    dataStrategy?.platforms?.length &&
    dataStrategy.platforms.map(pl => ({
      id: pl.id,
      label: pl.name,
      name: pl.name
    }));

  const schema = yup.object().shape({
    platforms: yup.array().required(t('required'))
  });

  const methods = useForm({
    defaultValues: {
      platforms: defaultPlatform
    },
    resolver: yupResolver(schema)
  });

  const {handleSubmit} = methods;

  const onSubmit = useCallback(
    async values => {
      setListErrors(prev => {
        delete prev.tab3;
        return prev;
      });
      setDataStrategy(prev => ({
        ...prev,
        platforms: values.platforms.map(item => item.id)
      }));
      goTo({nextTab: 'validation'});
    },
    [setDataStrategy, goTo, setListErrors]
  );

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormReactSelect
          required
          name="platforms"
          label={t('platforms')}
          placeholder={t('selectPlatforms')}
          multiple
          options={optionsPlatforms}
          defaultValue={defaultPlatform}
        />

        <div className="d-block text-right mr-15">
          <Button
            onClick={() => goTo({nextTab: 'audience'})}
            className="mb-2 mr-2 btn-icon"
            color="secondary"
          >
            <i className="pe-7s-refresh btn-icon-wrapper"> </i>
            {t('previous')}
          </Button>
          <Button type="submit" className="mb-2 mr-2 btn-icon" color="success">
            <i className="pe-7s-upload btn-icon-wrapper"> </i>
            {t('saveAndNext')}
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
};

export default Activation;
