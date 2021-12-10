import {ButtonLoading} from 'components/common';
import {FormTextInput} from 'components/forms';
import PropTypes from 'prop-types';
import {useCreateContainer} from 'queries/container';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {Button, ModalBody, ModalFooter} from 'reactstrap';
import {toggleCreateContainerModalRedux} from 'store/reducers/container';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {mappingFormToApi} from '../ContainerDetail/dto';
import PublisherSelect from '../ContainerDetail/PublisherSelect';

import {containerFormResolver} from '../ContainerSettings/validations';

function ContainerCreateForm(props) {
  const {t} = useTranslation();
  const {containers} = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {mutateAsync: createContainerRequest} = useCreateContainer();

  const methods = useForm({
    defaultValues: {
      name: '',
      url: ''
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
      navigate(`/container/${data?.uuid}`);
    } catch (error) {
      setIsLoading(false);
      ShowToast.error(error?.message);
    }
  };

  const handleCancel = () => {
    dispatch(toggleCreateContainerModalRedux());
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <ModalBody>
          <PublisherSelect currentContainer={null} isEdit={false} />
          <FormTextInput
            isRequired
            name="name"
            placeholder={`Container name...`}
            label={'Container name'}
            disable={isLoading}
          />
          <FormTextInput
            name="url"
            placeholder={`Container URL...`}
            label={'Container URL'}
            disable={isLoading}
          />
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
