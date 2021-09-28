/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

//---> Build-in Modules
import React, {useEffect} from 'react';

//---> External Modules
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Badge,
  Row,
  Col,
  FormGroup,
  Label
} from 'reactstrap';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext
} from 'react-hook-form';
import {makeStyles} from '@material-ui/core';
import DatePicker from 'react-datepicker';

//---> Internal Modules
import {getInventoryTypeColor} from '../helpers';
import {useTranslation} from 'react-i18next';
import {FormReactSelect, FormTextInput, FormToggle} from 'components/forms';
import {INPUTS_NAME} from '../constants';
import StartAt from './form-elements/start-at';
import {mappingFormToApi} from './dto';
import {useDealInventory} from 'queries/inventory';
import BlockUi from 'react-block-ui';

const useStyles = makeStyles({
  bgHover: {
    '&:hover': {
      backgroundColor: '#e0f3ff'
    }
  }
});

const InventoryDetails = ({
  modal = false,
  toggle = () => {},
  inventoryData = {},
  className = '',
  isBid = false,
  isDeal = false,
  dspOptions = [],
  audienceOptions = [],
  dealOptions = []
}) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const {mutateAsync: dealInventory} = useDealInventory();
  const methods = useForm({
    defaultValues: {
      [INPUTS_NAME.NAME]: '',
      [INPUTS_NAME.STATUS]: 'active',
      [INPUTS_NAME.DSP_UUID]: '',
      [INPUTS_NAME.START_AT]: null,
      [INPUTS_NAME.END_AT]: null
    }
  });
  const {handleSubmit, formState} = methods;

  const onSubmit = async formData => {
    console.log(
      '🚀 ~ file: inventory-detail.js ~ line 48 ~ onSubmit ~ formData',
      formData
    );
    const submitData = mappingFormToApi({formData});
    try {
      await dealInventory({data: submitData, inventoryId: inventoryData?.uuid});
    } catch (error) {
      console.log('🚀 ~ file: inventory-detail.js ~ line 75 ~ error', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        id="bidInventory"
      >
        <BlockUi tag="div" blocking={formState.isSubmitting}>
          <ModalHeader>{inventoryData?.name}</ModalHeader>
          <ModalBody>
            <Card className="mb-3">
              <CardBody className={classes.bgHover}>
                <div className="d-flex flex-wrap">
                  {/* Type */}
                  <InventoryPartial label="Type">
                    <Badge
                      color={getInventoryTypeColor({type: inventoryData?.type})}
                    >
                      {inventoryData?.type}
                    </Badge>
                  </InventoryPartial>

                  {/* Click rate */}
                  <InventoryPartial label="Click rate">
                    <Badge color="light" pill>
                      {inventoryData?.click_rate ?? 0}
                    </Badge>
                  </InventoryPartial>

                  {/* Fill rate */}
                  <InventoryPartial label="Fill rate">
                    <Badge color="info" pill>
                      {inventoryData?.fill_rate ?? 0}
                    </Badge>
                  </InventoryPartial>

                  {/* Minimum Price */}
                  <InventoryPartial label="Floor price">
                    <Badge color="warning" pill>
                      {inventoryData?.floor_price ?? 0}
                    </Badge>
                  </InventoryPartial>

                  {/* Format */}
                  <InventoryPartial label="Format">
                    {inventoryData?.format}
                  </InventoryPartial>
                  {/* Merge */}
                  <InventoryPartial label="Merge">
                    {inventoryData?.merge}
                  </InventoryPartial>

                  {/* Position */}
                  <InventoryPartial label="Position">
                    {inventoryData?.position}
                  </InventoryPartial>

                  {/* Witdh */}
                  <InventoryPartial label="Width">
                    <Badge color="light" pill>
                      {inventoryData?.metadata?.width ?? 0}
                    </Badge>
                  </InventoryPartial>

                  {/* Height */}
                  <InventoryPartial label="Height">
                    <Badge color="light" pill>
                      {inventoryData?.metadata?.height ?? 0}
                    </Badge>
                  </InventoryPartial>

                  {/* Background color */}
                  <InventoryPartial label="Background color">
                    <span
                      style={{
                        color: inventoryData?.metadata?.background_color ?? ''
                      }}
                    >
                      {inventoryData?.metadata?.background_color}
                    </span>
                  </InventoryPartial>
                </div>
              </CardBody>
            </Card>
            {isBid && (
              <>
                <Row className="mt-3">
                  <Col sm="4">
                    <DspSelect options={dspOptions} />
                  </Col>
                  <Col sm="4">
                    <AudienceSelect options={audienceOptions} />
                  </Col>
                  <Col sm="4">
                    <DealSelect options={dealOptions} />
                  </Col>
                </Row>
                <TimeRange />
              </>
            )}
            {/* Render date range picker */}
            {isDeal ? (
              <>
                <Row className="mt-3">
                  <Col sm="5">
                    <FormTextInput
                      name={INPUTS_NAME.NAME}
                      label="Name"
                      placeholder="Enter deal name..."
                    />
                  </Col>
                  <Col sm="4">
                    <DspSelect options={dspOptions} />
                  </Col>
                  <Col sm={3}>
                    <FormGroup>
                      <label>&nbsp;</label>
                      <div>
                        <FormToggle
                          name={INPUTS_NAME.STATUS}
                          defaultCheckedValue="active"
                          label={t('status')}
                          values={{
                            checked: 'active',
                            unChecked: 'inactive'
                          }}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <TimeRange />
              </>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={toggle}>
              Cancel
            </Button>
            {isBid && (
              <Button
                type="submit"
                color="primary"
                disabled={!formState.isDirty}
              >
                Bid
              </Button>
            )}
            {isDeal && (
              <Button
                type="submit"
                color="primary"
                disabled={!formState.isDirty}
              >
                Deal
              </Button>
            )}
          </ModalFooter>
        </BlockUi>
      </form>
    </FormProvider>
  );
};

const InventoryPartial = React.memo(({label = '', children}) => {
  return (
    <div className="d-flex" style={{width: '33.33333%', padding: '7.5px'}}>
      <div className="font-weight-bold">{label}:</div>
      <div className="ml-2">{children}</div>
    </div>
  );
});

// Sub components
const TimeRange = () => {
  const {t} = useTranslation();
  const {control, errors, register} = useFormContext();

  useEffect(() => {
    register([INPUTS_NAME.END_AT]);
  }, [register]);

  return (
    <Row className="mt-3">
      <Col xs="6">
        <FormGroup>
          <Label for="startDate">
            <span className="text-danger">*</span>
            {t('startDate')}
          </Label>

          <StartAt />
          {errors && errors['start_at'] ? (
            <div className="invalid-feedback d-block">
              {errors['start_at']?.message}
            </div>
          ) : null}
        </FormGroup>
      </Col>
      <Col xs="6">
        <FormGroup>
          <Label for="endDate">
            <span className="text-danger">*</span>
            {t('endDate')}
          </Label>
          <Controller
            control={control}
            name="end_at"
            render={({onChange, onBlur, value, name}) => (
              <DatePicker
                selected={value}
                onChange={date => onChange(date)}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
              />
            )}
          />
          {errors && errors['end_at'] ? (
            <div className="invalid-feedback d-block">
              {errors['end_at']?.message}
            </div>
          ) : null}
        </FormGroup>
      </Col>
    </Row>
  );
};

const DspSelect = ({options = []}) => {
  const {register} = useFormContext();

  useEffect(() => {
    register('dsp_uuid');
  }, [register]);

  return <FormReactSelect name="dsp_uuid" options={options} label="Dsp" />;
};

const AudienceSelect = ({options = []}) => {
  return (
    <FormReactSelect name="audience_uuid" options={options} label="Audience" />
  );
};

const DealSelect = ({options = []}) => {
  return <FormReactSelect name="deal_uuid" options={options} label="Deal" />;
};

export default React.memo(InventoryDetails);
