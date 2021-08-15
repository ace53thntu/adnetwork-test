import React, {useCallback, useState} from 'react';
import {Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {useForm, FormProvider} from 'react-hook-form';
import {v4} from 'uuid';

import {validationProperty} from './validations';

import {PROPERTIES_OPTIONS} from './constants';
import {useCreateProperty} from 'pages/Container/hooks/useCreateEventProperty';
import {FormReactSelect, FormTextInput} from 'components/forms';

export default function Property({
  toggle,
  setPropertyValue,
  trackProperties = [],
  fieldName,
  manualCollect,
  eventId
}) {
  const methods = useForm({
    defaultValues: {
      propertyName: ''
      // propertyType: null,
      // propertyContent: '',
      // propertyPossibleValue: ''
    },
    resolver: validationProperty(manualCollect)
  });
  const {handleSubmit, formState, setError, watch} = methods;
  const [createProperty] = useCreateProperty();

  const [isLoading, setIsLoading] = useState(false);

  const onHandleSubmit = useCallback(
    async values => {
      const {propertyName} = values;

      const isExistName = trackProperties.some(
        val => val.propertyName === propertyName
      );
      if (isExistName) {
        setError('propertyName', {
          type: 'manual',
          message: 'Duplicate property name'
        });
        return;
      }

      if (eventId) {
        setIsLoading(true);
        try {
          const createdProp = await createProperty({
            eventId,
            name: propertyName
          });
          const newProps = [
            ...trackProperties,
            {...values, id: createdProp.id}
          ];

          setPropertyValue(fieldName, newProps, {
            // shouldDirty: true,
            // shouldValidate: true
          });
          setIsLoading(false);
          toggle();
        } catch (error) {
          console.log('🚀 ~ file: Property.js ~ line 51 ~ error', error);
          setIsLoading(false);
        }
      } else {
        const newProps = [...trackProperties, {...values, id: v4()}];

        setPropertyValue(fieldName, newProps, {
          shouldDirty: true,
          shouldValidate: true
        });
        toggle();
      }
    },
    [
      createProperty,
      eventId,
      fieldName,
      setError,
      setPropertyValue,
      toggle,
      trackProperties
    ]
  );

  return (
    <FormProvider {...methods} key="event-property">
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        name="event-property"
        key="event-property"
      >
        <ModalHeader>Event Property</ModalHeader>
        <ModalBody>
          <FormTextInput
            isRequired
            name="propertyName"
            placeholder="Property name..."
            label="Name"
            autoComplete="off"
            disable={isLoading}
          />
          {manualCollect ? null : (
            <>
              <FormTextInput
                name="propertyPossibleValue"
                placeholder="Possible value..."
                label="Possible value"
                autoComplete="off"
              />
              <FormReactSelect
                name="propertyType"
                label="Type"
                placeholder="Select property type..."
                optionLabelField="name"
                options={PROPERTIES_OPTIONS}
                isClearable
              />
              {watch('propertyType') ? (
                <FormTextInput
                  name="propertyContent"
                  placeholder="Content..."
                  label="Content"
                  autoComplete="off"
                />
              ) : null}
            </>
          )}
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
