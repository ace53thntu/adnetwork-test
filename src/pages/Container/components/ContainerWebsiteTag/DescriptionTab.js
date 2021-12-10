import React, {useEffect, useState} from 'react';
import BlockUi from 'react-block-ui';
import {toast} from 'react-toastify';
import {useForm, FormProvider} from 'react-hook-form';
import {Row, Col, Card, CardHeader, CardFooter, CardBody} from 'reactstrap';

// components
import {FormTextInput, Forms, ButtonLoading} from 'components';
// validation
import {validationDescriptionTab} from './validations';
// queries/mutations
import {useUpdateContainer} from 'core/queries/containers';

function DescriptionTab({tabProps: {title}, container}) {
  const {name, status = 'draft', url} = container;
  const methods = useForm({
    defaultValues: {
      name,
      status,
      url
    },
    resolver: validationDescriptionTab()
  });
  const {handleSubmit, reset, formState} = methods;
  const [updateContainer] = useUpdateContainer();

  // local state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const onHandleSubmit = async values => {
    const updatedContainer = {
      ...container,
      ...values
    };
    setIsLoading(true);
    try {
      await updateContainer({cid: container.id, data: updatedContainer});
      setIsLoading(false);
      toast.success('Update successfully!', {
        closeOnClick: true
      });
      reset();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Row>
        <Col sm="12">
          <BlockUi tag="div" blocking={isLoading}>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
              <Card className="main-card mb-3 position-relative">
                <CardHeader>{title}</CardHeader>
                <CardBody>
                  <FormTextInput
                    isRequired
                    name="name"
                    placeholder="Container name"
                    label="Container name"
                    disable={isLoading}
                  />
                  <FormTextInput
                    name="url"
                    placeholder="Container URL"
                    label="Container URL"
                    disable={isLoading}
                  />
                  <Forms.FormRadioGroup
                    inline
                    label="Status"
                    items={[
                      {
                        id: 'draftStatus',
                        name: 'status',
                        label: 'Draft',
                        value: 'draft'
                      },
                      {
                        id: 'pendingStatus',
                        name: 'status',
                        label: 'Pending',
                        value: 'pending'
                      },
                      {
                        id: 'activeStatus',
                        name: 'status',
                        label: 'Active',
                        value: 'active'
                      }
                    ]}
                    disabled={isLoading}
                  />
                </CardBody>
                <CardFooter className="d-block text-right">
                  <ButtonLoading
                    loading={isLoading}
                    type="submit"
                    className="ml-2 btn-success"
                    disabled={!formState.isDirty}
                  >
                    Save Changes
                  </ButtonLoading>
                </CardFooter>
              </Card>
            </form>
          </BlockUi>
        </Col>
      </Row>
    </FormProvider>
  );
}

export default DescriptionTab;
