//---> Build-in Modules
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Button, Card, CardBody, Form, Input, Label} from 'reactstrap';
import {FilterStyled} from './styled';

export default function FilterBar() {
  const {t} = useTranslation();
  const methods = useForm({
    defaultValues: {
      latitude: '',
      longitude: '',
      time_zone: ''
    }
  });
  const {register} = methods;

  return (
    <Card>
      <CardBody>
        <FormProvider {...methods}>
          <Form autoComplete="off" id="filterForm" className="d-flex">
            <div className="mr-2">
              <Label>{t('LOCATION.LATITUDE')}</Label>
              <Input name="latitude" innerRef={register()} />
            </div>
            <div className="mr-2">
              <Label>{t('LOCATION.LONGITUDE')}</Label>
              <Input name="longitude" innerRef={register()} />
            </div>
            <div className="mr-2">
              <Label>{t('LOCATION.TIME_ZONE')}</Label>
              <Input name="time_zone" innerRef={register()} />
            </div>
            <FilterStyled>
              <Button type="submit" form="filterForm" color="primary">
                {t('COMMON.FILTER')}
              </Button>
            </FilterStyled>
          </Form>
        </FormProvider>
      </CardBody>
    </Card>
  );
}
