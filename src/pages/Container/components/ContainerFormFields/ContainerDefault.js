import {Collapse} from 'components/common';
import {FormReactSelect} from 'components/forms';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import DspSelect from 'components/forms/DspSelect';
import {MarketTypes} from 'constants/inventory';
import {
  getInventoryFormats,
  getInventoryTypes
} from 'pages/Container/constants';
import React from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

const ContainerDefault = ({isLoading = false, toggleCollapse}) => {
  const {t} = useTranslation();
  const {control} = useFormContext();
  const marketTypeSelected = useWatch({
    name: 'defaults.market_type',
    control
  });

  return (
    <>
      <Collapse initialOpen title="Defaults" unMount={false}>
        <Row>
          <Col sm="6">
            <FormReactSelect
              name="defaults.format"
              placeholder={t('selectFormat')}
              options={getInventoryFormats()}
              label={t('format')}
              defaultValue={null}
              required
            />
          </Col>
          <Col sm="3">
            <CurrencyInputField
              name="defaults.floor_price"
              label={t('floorPrice')}
              placeholder={t('floorPrice')}
              disabled={isLoading}
              decimalSeparator="."
              groupSeparator=","
              disableGroupSeparators={false}
              decimalsLimit={2}
              maxLength="4"
              prefix="$"
              required
            />
          </Col>
          <Col sm="3">
            <CurrencyInputField
              name="defaults.deal_floor_price"
              label={t('dealFloorPrice')}
              placeholder={t('dealFloorPrice')}
              disabled={isLoading}
              decimalSeparator="."
              groupSeparator=","
              disableGroupSeparators={false}
              decimalsLimit={2}
              maxLength="4"
              prefix="$"
            />
          </Col>
          <Col sm="6">
            <FormReactSelect
              name="defaults.type"
              placeholder={t('selectType')}
              options={getInventoryTypes()}
              label={t('type')}
              defaultValue={null}
            />
          </Col>
          <Col sm="6">
            <FormReactSelect
              name="defaults.market_type"
              placeholder={t('INVENTORY.SELECT_MARKET')}
              options={MarketTypes}
              label={t('INVENTORY.MARKET')}
              defaultValue={null}
            />
          </Col>
          {marketTypeSelected?.value === 'private' && (
            <Col sm="12">
              <DspSelect
                name="defaults.market_dsps"
                label={t('selectDsp')}
                placeholder={t('selectDsp')}
                multiple
              />
            </Col>
          )}
        </Row>
      </Collapse>
    </>
  );
};

export default ContainerDefault;
