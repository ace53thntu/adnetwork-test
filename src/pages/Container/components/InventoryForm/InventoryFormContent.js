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
import {MarketTypes, PriceEngines} from 'constants/inventory';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import TrackerTemplateSelect from './TrackerTemplateSelect';
import {InputStatus} from 'constants/misc';
import {Link} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';

const formName = {
  properties: 'properties',
  status: 'status',
  type: 'type',
  collect_type: 'collect_type',
  traits: 'traits',
  name: 'name',
  allow_deal: 'allow_deal',
  market_type: 'market_type'
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
  const watchMarkType = useWatch({name: formName.market_type});
  const watchEnableDeal = useWatch({name: formName.allow_deal});

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
              name={formName.allow_deal}
              defaultCheckedValue="active"
              label={t('allowDeal')}
              values={{
                checked: 'active',
                unChecked: 'inactive'
              }}
            />
          </FormGroup>
          <FormGroup className="d-flex justify-content-end mb-0 ml-3">
            <FormToggle
              name={formName.first_party}
              defaultCheckedValue="active"
              label={t('firstParty')}
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
              required
              name="type"
              label={t('type')}
              placeholder="Select type"
              optionLabelField="name"
              options={typeOptions}
              disabled={isSubmitting}
            />
          </Col>
          <Col sm={4}>
            <FormReactSelect
              required
              name="market_type"
              label={t('marketType')}
              placeholder={t('selectMarketType')}
              optionLabelField="name"
              options={MarketTypes || []}
              disabled={isSubmitting}
            />
          </Col>
          <Col sm={4}>
            <FormReactSelect
              required
              name="price_engine"
              label={t('priceEngine')}
              placeholder={t('selectPriceEngine')}
              optionLabelField="name"
              options={PriceEngines || []}
              disabled={isSubmitting}
            />
          </Col>
          {watchMarkType?.value === 'private' && (
            <Col sm={12}>
              <DspSelect currentInventory={inventory} />
            </Col>
          )}

          <Col sm={4}>
            <FormReactSelect
              required={true}
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
            <CurrencyInputField
              required
              name="floor_price"
              placeholder="0.0"
              label={t('floorPrice')}
              disabled={isSubmitting}
            />
          </Col>
          {watchEnableDeal === InputStatus.ACTIVE && (
            <Col sm={4}>
              <CurrencyInputField
                name="deal_floor_price"
                placeholder="0.0"
                label={t('dealFloorPrice')}
                disabled={isSubmitting}
              />
            </Col>
          )}

          <Col sm={6}>
            <TrackerTemplateSelect currentInventory={inventory} />
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
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
        </Row>
        <InventoryProperty currentInventory={inventory} />
      </ModalBody>
      <ModalFooter>
        <Button type="button" color="link" onClick={toggle}>
          Cancel
        </Button>
        <ButtonLoading
          loading={isLoading}
          type="submit"
          className="ml-2 btn-primary"
          disabled={!formState.isDirty}
        >
          {t('save')}
        </ButtonLoading>
        {inventory?.uuid && (
          <Link
            to={`/${RoutePaths.INVENTORY}/${inventory?.uuid}/${RoutePaths.REPORT}`}
          >
            <Button color="success" type="button">
              {t('viewReport')}
            </Button>
          </Link>
        )}
      </ModalFooter>
    </BlockUi>
  );
};

InventoryFormContent.propTypes = propTypes;

export default React.memo(InventoryFormContent);
