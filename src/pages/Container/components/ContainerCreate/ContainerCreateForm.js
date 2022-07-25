import {ApiError, ButtonLoading} from 'components/common';
import {FormTextInput, FormToggle} from 'components/forms';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import {useRefreshContainerTree} from 'pages/Container/hooks/useRefeshContainerTree';
import {USER_ROLE} from 'pages/user-management/constants';
import PropTypes from 'prop-types';
import {useCreateContainer} from 'queries/container';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {Button, Col, FormGroup, ModalBody, ModalFooter, Row} from 'reactstrap';
import {toggleCreateContainerModalRedux} from 'store/reducers/container';
import {getRole} from 'utils/helpers/auth.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import PublisherSelect from '../ContainerDetail/PublisherSelect';
import {mappingFormToApi} from '../ContainerDetail/dto';
import {ContainerDefault} from '../ContainerFormFields';
import {containerFormResolver} from '../ContainerSettings/validations';
import {useCreateReport} from 'queries/report';
import {DEFAULT_TIMEZONE} from 'constants/misc';
import {
  getDefaultPublisherMetric1,
  getDefaultPublisherMetric2,
  getDefaultReport
} from 'utils/metrics';
import {EntityTypes, PUBLISHER_REPORT_VIEW_TYPES} from 'constants/report';

const AM_ROLES = [USER_ROLE.ADMIN, USER_ROLE.MANAGER];

function ContainerCreateForm(props) {
  const {t} = useTranslation();
  const role = getRole();
  const {containers, publisher} = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {refresh} = useRefreshContainerTree();

  const {mutateAsync: createContainerRequest} = useCreateContainer();
  const {mutateAsync: createReport} = useCreateReport({});

  const methods = useForm({
    defaultValues: {
      name: '',
      url: '',
      status: 'active',
      cost: '',
      first_party: 'inactive',
      publisher_uuid: publisher
        ? {value: publisher?.uuid, label: publisher?.name}
        : null
    },
    resolver: containerFormResolver(containers, role)
  });
  const {handleSubmit, formState} = methods;

  const [isLoading, setIsLoading] = React.useState(false);

  const onHandleSubmit = async values => {
    setIsLoading(true);
    const formData = mappingFormToApi(values, role);
    try {
      const {data} = await createContainerRequest(formData);

      setIsLoading(false);
      ShowToast.success(`Create container successfully!`);
      handleCancel();

      // Refresh tree after create container
      await refresh();

      navigate(`/container/${data?.uuid}`);

      // Create default report
      const timeZone = DEFAULT_TIMEZONE;
      const report1SubmitData = getDefaultReport({
        parentPath: data?.publisher_name,
        sourceUuid: data?.uuid,
        reportSource: EntityTypes.CONTAINER,
        timeZone,
        campaignName: data?.name,
        metricSets: getDefaultPublisherMetric1({
          metricTypeOptions: PUBLISHER_REPORT_VIEW_TYPES
        })
      });
      const report2SubmitData = getDefaultReport({
        parentPath: data?.publisher_name,
        sourceUuid: data?.uuid,
        reportSource: EntityTypes.CONTAINER,
        timeZone,
        campaignName: data?.name,
        metricSets: getDefaultPublisherMetric2({
          metricTypeOptions: PUBLISHER_REPORT_VIEW_TYPES
        })
      });
      createReport(report1SubmitData);
      createReport(report2SubmitData);
    } catch (error) {
      setIsLoading(false);
      ShowToast.error(
        <ApiError apiError={error || 'Fail to create Container'} />
      );
    }
  };

  const handleCancel = () => {
    dispatch(toggleCreateContainerModalRedux());
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete="off">
        <ModalBody>
          <Row>
            <Col sm="12">
              <PublisherSelect
                currentContainer={null}
                isEdit={false}
                disabled
              />
            </Col>
            <Col sm="12">
              <FormTextInput
                isRequired
                name="name"
                placeholder={`Container name...`}
                label={'Container name'}
                disable={isLoading}
              />
            </Col>
            <Col sm="12">
              <FormTextInput
                name="url"
                placeholder={`Container URL...`}
                label={'Container URL'}
                disable={isLoading}
                isRequired
              />
            </Col>
            {AM_ROLES.includes(role) && (
              <Col sm="12">
                <CurrencyInputField
                  name="cost"
                  label="Commission Cost"
                  placeholder="Commission Cost"
                  disabled={isLoading}
                  decimalSeparator="."
                  groupSeparator=","
                  disableGroupSeparators={false}
                  decimalsLimit={2}
                  maxLength="4"
                  description="The cost should be between 0.01 and 0.99"
                  required
                />
              </Col>
            )}

            <Col sm="6">
              <FormGroup className="d-flex mb-0 ">
                <FormToggle
                  name="status"
                  defaultCheckedValue="active"
                  label={t('status')}
                  values={{
                    checked: 'active',
                    unChecked: 'inactive'
                  }}
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup className="d-flex mb-0 ">
                <FormToggle
                  name="first_party"
                  defaultCheckedValue="active"
                  label={t('firstParty')}
                  values={{
                    checked: 'active',
                    unChecked: 'inactive'
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <ContainerDefault isLoading={isLoading} />
        </ModalBody>

        <ModalFooter>
          <ButtonLoading
            loading={isLoading}
            type="submit"
            className="ml-2 btn-primary"
            disabled={!formState.isDirty}
          >
            {t('save')}
          </ButtonLoading>
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </FormProvider>
  );
}

ContainerCreateForm.propTypes = {
  containers: PropTypes.array
};
ContainerCreateForm.defaultProps = {
  containers: []
};

export default ContainerCreateForm;
