import { Collapse } from "components/common"
import { CurrencyInputField } from "components/forms/CurrencyInputField"
import React from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Col, Row } from "reactstrap"

const PriceModel = () => {
  const {t} = useTranslation();
  const {formState: {isSubmitting}, errors} =useFormContext()

  return (
    <Collapse initialOpen title="Price model">
      <Row>
        <Col sm='4'>
          <CurrencyInputField
            name="metadata.cpm"
            placeholder="0.0"
            label={t('INVENTORY.CPM')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.metadata?.cpm}
          />
        </Col>
        <Col sm='4'>
          <CurrencyInputField
            name="metadata.cpc"
            placeholder="0.0"
            label={t('INVENTORY.CPC')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.metadata?.cpc}
          />
        </Col>
        <Col sm='4'>
          <CurrencyInputField
            name="metadata.cpa"
            placeholder="0.0"
            label={t('INVENTORY.CPA')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.metadata?.cpa}
          />
        </Col>
        <Col sm='4'>
          <CurrencyInputField
            name="metadata.cpd"
            placeholder="0.0"
            label={t('INVENTORY.CPD')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.metadata?.cpd}
          />
        </Col>
        <Col sm='4'>
          <CurrencyInputField
            name="metadata.cpl"
            placeholder="0.0"
            label={t('INVENTORY.CPL')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.metadata?.cpl}
          />
        </Col>
        <Col sm='4'>
          <CurrencyInputField
            name="metadata.cpe"
            placeholder="0.0"
            label={t('INVENTORY.CPE')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.metadata?.cpe}
          />
        </Col>
        <Col sm='4'>
          <CurrencyInputField
            name="metadata.cpv"
            placeholder="0.0"
            label={t('INVENTORY.CPV')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.metadata?.cpv}
          />
        </Col>
        <Col sm='4'>
          <CurrencyInputField
            name="metadata.cpi"
            placeholder="0.0"
            label={t('INVENTORY.CPI')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.metadata?.cpi}
          />
        </Col>
        <Col sm='4'>
          <CurrencyInputField
            name="metadata.cpvm"
            placeholder="0.0"
            label={t('INVENTORY.CPVM')}
            disabled={isSubmitting}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            invalid={errors?.metadata?.cpvm}
          />
        </Col>
      </Row>
    </Collapse>
  )
}

export default PriceModel;
