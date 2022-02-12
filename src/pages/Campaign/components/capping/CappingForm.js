// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {Badge, Col, Form, Label, Row} from 'reactstrap';

// Internal Modules
import {ActiveToggle, FormTextInput} from 'components/forms';
import {useTranslation} from 'react-i18next';
import {schemaValidate} from './validation';
import KeywordListSelect from 'components/forms/KeywordListSelect';
import {CAMPAIGN_KEYS} from 'pages/Campaign/constants';
import DomainGroupSelect from 'components/forms/DomainGroupSelect';
import {CappingTypes} from 'constants/misc';

const propTypes = {
  capping: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
};

const CappingForm = ({capping = {}, onSubmit = () => null}) => {
  const {t} = useTranslation();
  const cappingType = capping?.type || '';
  console.log(
    '🚀 ~ file: CappingForm.js ~ line 26 ~ CappingForm ~ cappingType',
    cappingType
  );
  const defaultValues = React.useMemo(() => {
    if (
      cappingType === CappingTypes.BUDGET.value ||
      cappingType === CappingTypes.BUDGET_MANAGER.value ||
      cappingType === CappingTypes.IMPRESSION.value
    ) {
      return {
        target: capping?.target,
        status: capping?.status
      };
    }
    if (cappingType === CappingTypes.DOMAIN.value) {
      return {
        domain_group_white_list_uuid: capping?.domain_group_white_list?.map(
          item => ({value: item?.uuid, label: item?.name})
        ),
        domain_group_black_list_uuid: capping?.domain_group_black_list?.map(
          item => ({value: item?.uuid, label: item?.name})
        ),
        status: capping?.status
      };
    }
    if (cappingType === CappingTypes.KEYWORD.value) {
      return {
        keywords_list_white_uuid: capping?.keywords_list_white?.map(item => ({
          value: item?.uuid,
          label: item?.name
        })),
        keywords_list_black_uuid: capping?.keywords_list_black?.map(item => ({
          value: item?.uuid,
          label: item?.name
        })),
        status: capping?.status
      };
    }
  }, [capping, cappingType]);
  console.log(
    '🚀 ~ file: CappingForm.js ~ line 62 ~ defaultValues ~ defaultValues',
    defaultValues
  );

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t, cappingType)
  });
  const {handleSubmit, control} = methods;

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
              <Col sm={4}>
                <FormTextInput
                  name="target"
                  label="Target"
                  placeholder="0.0"
                  isRequired
                />
              </Col>
            )}

            {/* Status */}
            <Col md="4">
              <Label className="mr-5">{t('status')}</Label>
              <Controller
                control={control}
                name="status"
                render={({onChange, onBlur, value, name}) => (
                  <ActiveToggle value={value} onChange={onChange} />
                )}
              />
            </Col>

            {/* Type */}
            <Col md="4">
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

          {cappingType === CappingTypes.DOMAIN.value && (
            <Row>
              <Col md="6">
                <DomainGroupSelect
                  name={CAMPAIGN_KEYS.DOMAIN_GROUP_WHITE_UUID}
                  label={t('domainGroupWhite')}
                  placeholder={t('selectDomainGroupWhite')}
                  defaultValues={[]}
                  multiple
                />
              </Col>
              <Col md="6">
                <DomainGroupSelect
                  name={CAMPAIGN_KEYS.DOMAIN_GROUP_BLACK_UUID}
                  label={t('domainGroupBlack')}
                  placeholder={t('selectDomainGroupBlack')}
                  defaultValues={[]}
                  multiple
                />
              </Col>
            </Row>
          )}

          {cappingType === CappingTypes.KEYWORD.value && (
            <Row>
              <Col md="6">
                <KeywordListSelect
                  name={CAMPAIGN_KEYS.KEYWORD_LIST_WHITE_UUID}
                  label={t('keywordListWhite')}
                  placeholder={t('selectKeywordListWhite')}
                  defaultValues={[]}
                  multiple
                />
              </Col>
              <Col md="6">
                <KeywordListSelect
                  name={CAMPAIGN_KEYS.KEYWORD_LIST_BLACK_UUID}
                  label={t('keywordListBlack')}
                  placeholder={t('selectKeywordListBlack')}
                  defaultValues={[]}
                  multiple
                />
              </Col>
            </Row>
          )}
        </Form>
      </FormProvider>
    </div>
  );
};

CappingForm.propTypes = propTypes;

export default CappingForm;