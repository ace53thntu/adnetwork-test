//---> Build-in Modules
import React from 'react';

//---> External Modules
import {
  Button,
  Modal,
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
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {makeStyles} from '@material-ui/core';
import DatePicker from 'react-datepicker';

//---> Internal Modules
import {getInventoryTypeColor} from '../helpers';
import {useTranslation} from 'react-i18next';

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
  isDeal = false
}) => {
  const classes = useStyles();

  return (
    <Modal isOpen={modal} className={className} size="lg">
      <ModalHeader>{inventoryData?.name}</ModalHeader>
      <ModalBody>
        <Card>
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
              <InventoryPartial label="Minimum price">
                <Badge color="warning" pill>
                  {inventoryData?.minimum_price ?? 0}
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
        {/* Render date range picker */}
        {isBid || isDeal ? <TimeRange /> : null}
      </ModalBody>
      <ModalFooter>
        <Button color="link" onClick={toggle}>
          Cancel
        </Button>
        {isBid && (
          <Button color="primary" onClick={toggle}>
            Bid
          </Button>
        )}
        {isDeal && (
          <Button color="primary" onClick={toggle}>
            Deal
          </Button>
        )}
      </ModalFooter>
    </Modal>
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

const TimeRange = () => {
  const {t} = useTranslation();
  const methods = useForm();
  const {control, errors} = methods;

  return (
    <FormProvider {...methods}>
      <form>
        <Row className="mt-3">
          <Col xs="6">
            <FormGroup>
              <Label for="startDate">
                <span className="text-danger">*</span>
                {t('startDate')}
              </Label>
              <Controller
                control={control}
                name="start_at"
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
      </form>
    </FormProvider>
  );
};

export default React.memo(InventoryDetails);
