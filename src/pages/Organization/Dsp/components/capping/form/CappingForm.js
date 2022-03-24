// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {FormProvider, useForm} from 'react-hook-form';
import {Badge, Col, Form, Label, Row} from 'reactstrap';

// Internal Modules
import {useTranslation} from 'react-i18next';
import {schemaValidate} from '../validation';
import {CappingTypes} from 'constants/misc';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';

const propTypes = {
  capping: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
};

const CappingForm = ({capping = {}, onSubmit = () => null}) => {
  const {t} = useTranslation();
  const cappingType = capping?.type || '';

  const defaultValues = React.useMemo(() => {
    if (
      cappingType === CappingTypes.BUDGET.value ||
      cappingType === CappingTypes.BUDGET_MANAGER.value ||
      cappingType === CappingTypes.IMPRESSION.value
    ) {
      return {
        target: HandleCurrencyFields.convertApiToGui({value: capping?.target}),
        status: capping?.status
      };
    }
  }, [capping, cappingType]);

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t, cappingType)
  });
  const {handleSubmit} = methods;

  return (
    <div>
      <FormProvider {...methods}>
        <Form
          id="cappingForm"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Row>
            {(cappingType === CappingTypes.BUDGET.value ||
              cappingType === CappingTypes.BUDGET_MANAGER.value ||
              cappingType === CappingTypes.IMPRESSION.value) && (
              <Col sm={6}>
                <CurrencyInputField
                  name="target"
                  label="Target"
                  placeholder="0.0"
                  decimalSeparator="."
                  groupSeparator=","
                  disableGroupSeparators={false}
                  decimalsLimit={3}
                  prefix="$"
                  required
                />
              </Col>
            )}

            {/* Type */}
            <Col md="6">
              <Label className="mr-5">{t('type')}</Label>
              <div>
                <Badge color="primary">
                  {
                    Object.values(CappingTypes)?.find(
                      item => item.value === cappingType
                    )?.label
                  }
                </Badge>
              </div>
            </Col>
          </Row>
        </Form>
      </FormProvider>
    </div>
  );
};

CappingForm.propTypes = propTypes;

export default CappingForm;
