import React, {useCallback, useState} from 'react';
import {Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {useForm, FormProvider} from 'react-hook-form';

import {validationProperty} from './validations';
import {useUpdateProperty} from 'pages/Container/hooks/useUpdateEventProperty';
import {FormTextInput} from 'components/forms';

export default function PropertyDetail({
  toggle,
  setPropertyValue,
  properties = [],
  fieldName,
  manualCollect,
  eventId,
  currentPropId
}) {
  const selectedProp = properties?.find(prop => prop.id === currentPropId);

  const [updateProperty] = useUpdateProperty();

  const methods = useForm({
    defaultValues: {
      propertyName: selectedProp?.propertyName ?? ''
    },
    resolver: validationProperty(manualCollect)
  });
  const {handleSubmit, formState} = methods;

  const [isLoading, setIsLoading] = useState(false);

  const onHandleSubmit = useCallback(
    async ({propertyName}) => {
      setIsLoading(true);
      try {
        await updateProperty({
          name: propertyName,
          propId: currentPropId,
          eventId
        });
        setIsLoading(false);
        toggle();
      } catch (error) {
        console.log(
          '🚀 ~ file: PropertyDetail.js ~ line 39 ~ onHandleSubmit ~ error',
          error
        );
        setIsLoading(false);
      }
    },
    [currentPropId, eventId, toggle, updateProperty]
  );

  return (
    <FormProvider {...methods} key="event-property">
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        name="event-property"
        key="event-property"
      >
        <ModalHeader>Event Property Detail</ModalHeader>
        <ModalBody>
          <FormTextInput
            isRequired
            name="propertyName"
            placeholder="Property name..."
            label="Name"
            autoComplete="off"
            disable={isLoading}
          />
        </ModalBody>
        <ModalFooter>
          {formState.isDirty ? (
            <Button
              color="primary"
              type="submit"
              disabled={!formState.isDirty || isLoading}
            >
              Save
            </Button>
          ) : null}

          {/* <Button
            color="secondary"
            onClick={toggle}
            type="button"
            disabled={isLoading}
          >
            Cancel
          </Button> */}
        </ModalFooter>
      </form>
    </FormProvider>
  );
}
