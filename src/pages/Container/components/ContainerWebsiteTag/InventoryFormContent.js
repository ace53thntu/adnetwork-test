//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import {useTranslation} from 'react-i18next';
import {useFormContext, useWatch} from 'react-hook-form';
import {
  Col,
  FormGroup,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Button
} from 'reactstrap';

//---> Internal Modules
import {FormReactSelect, FormTextInput, FormToggle} from 'components/forms';
import {ButtonLoading} from 'components/common';
import InventoryProperty from './InventoryProperty';
import DspSelect from './DspSelect';
import {MartketTypes, PriceEngines} from 'constants/inventory';

const formName = {
  properties: 'properties',
  status: 'status',
  type: 'type',
  collect_type: 'collect_type',
  traits: 'traits',
  name: 'name',
  enable_deal: 'enable_deal'
};

const propTypes = {
  isLoading: PropTypes.bool,
  typeOptions: PropTypes.array,
  inventoryFormatOptions: PropTypes.array,
  positionOptions: PropTypes.array,
  trackerTemplateOptions: PropTypes.array,
  inventory: PropTypes.object,
  toggle: PropTypes.func
};

const InventoryFormContent = ({
  isLoading = false,
  typeOptions = [],
  inventoryFormatOptions = [],
  positionOptions = [],
  trackerTemplateOptions = [],
  inventory = {},
  toggle = () => null
}) => {
  const {t} = useTranslation();
  const {formState} = useFormContext();
  const isSubmitting = formState?.isSubmitting;
  const watchMarkType = useWatch({name: 'market_type'});

  return (
    <BlockUi tag="div" blocking={isLoading}>
      <ModalHeader>Inventory Information</ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-end">
          <FormGroup className="d-flex justify-content-end mb-0">
            <FormToggle
              name={formName.status}
              defaultCheckedValue="active"
              label={t('status')}
              values={{
                checked: 'active',
                unChecked: 'inactive'
              }}
            />
          </FormGroup>
          <FormGroup className="d-flex justify-content-end mb-0 ml-3">
            <FormToggle
              name={formName.enable_deal}
              defaultCheckedValue="active"
              label={t('enableDeal')}
              values={{
                checked: 'active',
                unChecked: 'inactive'
              }}
            />
          </FormGroup>
        </div>
        <FormGroup>
          <FormTextInput
            isRequired
            name="name"
            placeholder="Name..."
            label={t('name')}
            disable={isSubmitting}
          />
        </FormGroup>
        <Row>
          <Col sm={4}>
            <FormReactSelect
              required={true}
              name="type"
              label={t('type')}
              placeholder="Select type"
              optionLabelField="name"
              options={typeOptions}
              disabled={isSubmitting}
              multiple={false}
            />
          </Col>
          <Col sm={4}>
            <FormReactSelect
              required={true}
              name="market_type"
              label={t('marketType')}
              placeholder={t('selectMartketType')}
              optionLabelField="name"
              options={MartketTypes || []}
              disabled={isSubmitting}
              multiple={false}
            />
          </Col>
          <Col sm={4}>
            <FormReactSelect
              required={true}
              name="price_engine"
              label={t('priceEngine')}
              placeholder={t('selectPriceEngine')}
              optionLabelField="name"
              options={PriceEngines || []}
              disabled={isSubmitting}
              multiple={false}
            />
          </Col>
          <Col
            sm={12}
            className={watchMarkType?.value === 'private' ? 'block' : 'd-none'}
          >
            <DspSelect currentInventory={inventory} />
          </Col>
          <Col sm={4}>
            <FormReactSelect
              required={false}
              name="format"
              label={t('format')}
              placeholder={t('selectFormat')}
              optionLabelField="name"
              options={inventoryFormatOptions}
              disabled={isSubmitting}
              multiple={false}
            />
          </Col>
          <Col sm={4}>
            <FormTextInput
              isRequired={false}
              name="floor_price"
              placeholder="0.0"
              label={t('floorPrice')}
              disable={isSubmitting}
            />
          </Col>
          <Col sm={4}>
            <FormTextInput
              isRequired={false}
              name="merge"
              placeholder={`${t('merge')}...`}
              label={t('merge')}
              disable={isSubmitting}
            />
          </Col>
        </Row>

        <Row>
          <Col sm={6}>
            <FormReactSelect
              required={false}
              name="position_id"
              label={t('position')}
              placeholder="Select position"
              optionLabelField="name"
              options={positionOptions}
              disabled={isSubmitting}
              multiple={false}
            />
          </Col>
          <Col sm={6}>
            <FormReactSelect
              required={false}
              name="tracker_template_uuid"
              label={t('trackerTemplate')}
              placeholder="Select tracker template"
              optionLabelField="name"
              options={trackerTemplateOptions}
              disabled={isSubmitting}
              multiple={false}
            />
          </Col>
        </Row>
        <InventoryProperty currentInventory={inventory} />
      </ModalBody>
      <ModalFooter>
        <Button type="button" color="link" onClick={toggle}>
          Cancel
        </Button>
        {formState.isDirty ? (
          <ButtonLoading
            loading={isLoading}
            type="submit"
            className="ml-2 btn-primary"
            disabled={!formState.isDirty}
          >
            {t('save')}
          </ButtonLoading>
        ) : null}
      </ModalFooter>
    </BlockUi>
  );
};

InventoryFormContent.propTypes = propTypes;

export default React.memo(InventoryFormContent);
