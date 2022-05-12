import {ButtonLoading} from 'components/common';
//---> Internal Modules
import {FormReactSelect, FormTextInput, FormToggle} from 'components/forms';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import PositionSelect from 'components/forms/PositionSelect';
import {MarketTypes, PriceEngines} from 'constants/inventory';
import {InputStatus} from 'constants/misc';
import {RoutePaths} from 'constants/route-paths';
//---> External Modules
import PropTypes from 'prop-types';
//---> Build-in Modules
import React from 'react';
import BlockUi from 'react-block-ui';
import {useFormContext, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {
  Button,
  Col,
  FormGroup,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

import DirectSnippet from '../Snippets/DirectUrlSnippet';
import InventorySnippet from '../Snippets/InventorySnippet';
import DspSelect from './DspSelect';
import InventoryProperty from './InventoryProperty';
import TrackerForm from './TrackerForm';
import {SDK_NAME} from 'constants/container';

const formName = {
  properties: 'properties',
  status: 'status',
  type: 'type',
  name: 'name',
  allow_deal: 'allow_deal',
  market_type: 'market_type',
  first_party: 'first_party',
  is_auto_create: 'is_auto_create'
};

const propTypes = {
  isLoading: PropTypes.bool,
  typeOptions: PropTypes.array,
  inventoryFormatOptions: PropTypes.array,
  inventory: PropTypes.object,
  toggle: PropTypes.func
};

const inventoryCodeSnippet = inventoryId => {
  return `window.${SDK_NAME}.requestAds([{
    inventoryId: ${inventoryId},
    placementId: "//your placement ID in DOM"
  }]);`;
};

const directURLCodeSnippet = inventoryId => {
  return `${window.ADN_META_DATA.DIRECT_URL}/${inventoryId}`;
};

const InventoryFormContent = ({
  isLoading = false,
  typeOptions = [],
  inventoryFormatOptions = [],
  inventory = {},
  toggle = () => null,
  isCreate = false
}) => {
  const {t} = useTranslation();
  const {formState} = useFormContext();
  const isSubmitting = formState?.isSubmitting;
  const watchMarkType = useWatch({name: formName.market_type});
  const watchEnableDeal = useWatch({name: formName.allow_deal});

  return (
    <BlockUi tag="div" blocking={isLoading}>
      <ModalHeader>{t('INVENTORY.INVENTORY_INFORMATION')}</ModalHeader>
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
          <FormGroup className="d-flex justify-content-end mb-0 ml-3">
            <FormToggle
              name={formName.is_auto_create}
              defaultCheckedValue="active"
              label={t('INVENTORY.IS_AUTO_CREATE')}
              values={{
                checked: 'active',
                unChecked: 'inactive'
              }}
              disabled
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
              decimalSeparator="."
              groupSeparator=","
              disableGroupSeparators={false}
              decimalsLimit={3}
              prefix="$"
            />
          </Col>
          {watchEnableDeal === InputStatus.ACTIVE && (
            <Col sm={4}>
              <CurrencyInputField
                name="deal_floor_price"
                placeholder="0.0"
                label={t('dealFloorPrice')}
                disabled={isSubmitting}
                decimalSeparator="."
                groupSeparator=","
                disableGroupSeparators={false}
                decimalsLimit={3}
                prefix="$"
                required
              />
            </Col>
          )}
        </Row>

        <Row>
          <Col sm={12}>
            <PositionSelect
              name="position_uuid"
              label={t('position')}
              placeholder="Select position"
              disabled={isSubmitting}
              defaultValue={null}
            />
          </Col>
        </Row>
        <InventoryProperty currentInventory={inventory} isCreate={isCreate} />
        {inventory?.uuid && (
          <>
            <InventorySnippet>
              {inventoryCodeSnippet(inventory?.id || '')}
            </InventorySnippet>
            <DirectSnippet>
              {directURLCodeSnippet(inventory?.uuid || '')}
            </DirectSnippet>
          </>
        )}

        <TrackerForm />
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
