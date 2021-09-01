import React, {useCallback} from 'react';
import BlockUi from 'react-block-ui';
import {useForm, FormProvider} from 'react-hook-form';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

// components
import {validationDescriptionTab} from '../ContainerWebsiteTag/validations';
import {ButtonLoading} from 'components/common';
import {FormReactSelect, FormTextInput} from 'components/forms';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreateContainer} from 'queries/container';
import {useNavigate} from 'react-router-dom';
import {usePublisherOptions} from 'pages/Container/hooks/usePublisherOptions';
import {destructureFormData} from './dto';

function ContainerCreateDialog({isOpen, toggle, containers = []}) {
  const navigate = useNavigate();
  const publishers = usePublisherOptions();
  const {mutateAsync: createContainer} = useCreateContainer();
  const methods = useForm({
    defaultValues: {
      name: '',
      url: '',
      publisher: null
    },
    resolver: validationDescriptionTab(containers)
  });
  const {handleSubmit, reset, formState} = methods;

  const onHandleSubmit = useCallback(
    async values => {
      const formData = destructureFormData(values);
      try {
        const res = await createContainer(formData);
        ShowToast.success(`Create container successfully!`, {
          closeOnClick: true
        });
        reset();
        toggle();
        if (res?.id) {
          navigate(`/container/${res.id}`);
        }
      } catch (error) {
        console.log('ContainerCreate -> error', error);
        ShowToast.success(error, {
          closeOnClick: true
        });
      }
    },
    [createContainer, navigate, reset, toggle]
  );

  return (
    <Modal unmountOnClose isOpen={isOpen}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <BlockUi tag="div" blocking={formState.isSubmitting}>
            <ModalHeader>Create container</ModalHeader>
            <ModalBody>
              <FormReactSelect
                required
                name="publisher"
                label="Publisher"
                placeholder={'Select publisher'}
                options={publishers}
              />
              <FormTextInput
                isRequired
                name="name"
                placeholder={`Container name...`}
                label={'Container name'}
                disable={formState.isSubmitting}
              />
              <FormTextInput
                name="url"
                placeholder={`Container URL...`}
                label={'Container URL'}
                disable={formState.isSubmitting}
              />
            </ModalBody>
            <ModalFooter>
              <ButtonLoading
                loading={formState.isSubmitting}
                type="submit"
                className="ml-2 btn-primary"
                disabled={!formState.isDirty}
              >
                Save
              </ButtonLoading>
              <Button
                color="secondary"
                onClick={() => {
                  reset();
                  toggle();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </BlockUi>
        </form>
      </FormProvider>
    </Modal>
  );
}

export default ContainerCreateDialog;
