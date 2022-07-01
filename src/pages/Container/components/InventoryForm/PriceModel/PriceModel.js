import {Collapse} from 'components/common';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

const PriceModel = () => {
  const {t} = useTranslation();
  const {
    formState: {isSubmitting},
    errors
  } = useFormContext();

  return (
    <Collapse initialOpen title="Price model">
      <Row>
        <Col sm="4">
          <CurrencyInputField
            name="cpm"
            placeholder="0.0"
            label={t('INVENTORY.CPM')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.cpm}
          />
        </Col>
        <Col sm="4">
          <CurrencyInputField
            name="cpc"
            placeholder="0.0"
            label={t('INVENTORY.CPC')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.cpc}
          />
        </Col>
        <Col sm="4">
          <CurrencyInputField
            name="cpa"
            placeholder="0.0"
            label={t('INVENTORY.CPA')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.cpa}
          />
        </Col>
        <Col sm="4">
          <CurrencyInputField
            name="cpd"
            placeholder="0.0"
            label={t('INVENTORY.CPD')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.cpd}
          />
        </Col>
        <Col sm="4">
          <CurrencyInputField
            name="cpl"
            placeholder="0.0"
            label={t('INVENTORY.CPL')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.cpl}
          />
        </Col>
        <Col sm="4">
          <CurrencyInputField
            name="cpe"
            placeholder="0.0"
            label={t('INVENTORY.CPE')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.cpe}
          />
        </Col>
        <Col sm="4">
          <CurrencyInputField
            name="cpv"
            placeholder="0.0"
            label={t('INVENTORY.CPV')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.cpv}
          />
        </Col>
        <Col sm="4">
          <CurrencyInputField
            name="cpi"
            placeholder="0.0"
            label={t('INVENTORY.CPI')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.cpi}
          />
        </Col>
        <Col sm="4">
          <CurrencyInputField
            name="cpvm"
            placeholder="0.0"
            label={t('INVENTORY.CPVM')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.cpvm}
          />
        </Col>
      </Row>
    </Collapse>
  );
};

export default PriceModel;
