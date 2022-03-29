import {ContainerAPIRequest} from 'api/container.api';
import {ButtonLoading} from 'components/common';
import {FormTextInput, FormToggle} from 'components/forms';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import PropTypes from 'prop-types';
import {useCreateContainer} from 'queries/container';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {Button, Col, FormGroup, ModalBody, ModalFooter, Row} from 'reactstrap';
import {
  setContainersRedux,
  toggleCreateContainerModalRedux
} from 'store/reducers/container';
import {getResponseData, isValidResponse} from 'utils/helpers/misc.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {mappingFormToApi} from '../ContainerDetail/dto';
import PublisherSelect from '../ContainerDetail/PublisherSelect';

import {containerFormResolver} from '../ContainerSettings/validations';
import {containersMapData} from '../Tree/dto';

function ContainerCreateForm(props) {
  const {t} = useTranslation();
  const {containers, publisher} = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {mutateAsync: createContainerRequest} = useCreateContainer();

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
    resolver: containerFormResolver(containers)
  });
  const {handleSubmit, formState} = methods;

  const [isLoading, setIsLoading] = React.useState(false);

  const onHandleSubmit = async values => {
    setIsLoading(true);
    const formData = mappingFormToApi(values);
    try {
      const {data} = await createContainerRequest(formData);

      setIsLoading(false);
      ShowToast.success(`Create container successfully!`);
      handleCancel();

      // Refresh tree after create container
      const res = await ContainerAPIRequest.getAllContainer({
        params: {
          page: 1,
          per_page: DEFAULT_PAGINATION.perPage,
          sort: 'created_at DESC'
        },
        options: {
          isResponseAll: IS_RESPONSE_ALL
        }
      });

      if (isValidResponse(res, IS_RESPONSE_ALL)) {
        const items = containersMapData(
          getResponseData(res, IS_RESPONSE_ALL),
          1
        );
        dispatch(setContainersRedux(items, 1));
      }

      navigate(`/container/${data?.uuid}`);
    } catch (error) {
      setIsLoading(false);
      ShowToast.error(error?.msg || 'Fail to create Container');
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
                description="The Cost should be between 0.01 and 0.09"
                required
              />
            </Col>
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
