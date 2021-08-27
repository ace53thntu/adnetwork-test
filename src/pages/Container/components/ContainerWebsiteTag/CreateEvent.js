import {
  ALL_TRACK_EVENTS,
  DEFAULT_EVENT_PROPERTIES,
  EVENTS_TYPE,
  EVENT_TYPES_VALUE
} from '../../constants';
// components
import {COLLECT_TYPES, TYPES_VAL} from './constants';
import {
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import {FormProvider, useForm} from 'react-hook-form';
import React, {useCallback, useEffect, useMemo, useState} from 'react';

import BlockUi from 'react-block-ui';
import IdentifyEvent from './IdentifyEvent';
import PageEvent from './PageEvent';
import Property from './Property';
import TrackEvent from './TrackEvent';
import {toast} from 'react-toastify';
import useCreateEvent from 'pages/Container/hooks/useCreateEvent';
import {useCreateProperty} from 'pages/Container/hooks/useCreateEventProperty';
import {useEvents} from 'pages/Container/hooks/useEvents';
import {useParams} from 'react-router-dom';
import {validationEvent} from './validations';
import {FormCheckbox, FormReactSelect, FormToggle} from 'components/forms';
import {ButtonLoading} from 'components/common';

const formName = {
  properties: 'properties',
  status: 'status',
  type: 'type',
  collect_type: 'collect_type',
  traits: 'traits',
  name: 'name'
};

function CreateEvent({isOpen = false, toggle = () => {}}) {
  const {pageId} = useParams();
  const {data: events = []} = useEvents({pageId, page: 1, perPage: 10000});
  // const [createEvent] = useCreateEvent();
  const createEvent = useCallback(() => {
    return new Promise();
  }, []);
  // const [createProperty] = useCreateProperty();

  const eventsTypeTrack = useMemo(() => {
    return events?.events?.filter(event =>
      ALL_TRACK_EVENTS.includes(event.type)
    );
  }, [events?.events]);

  const existedIdentifyEvent = events?.events?.find(
    event => event.type === EVENT_TYPES_VALUE.identify
  );

  const existedPageEvent = events?.events?.find(
    event => event.type === EVENT_TYPES_VALUE.page
  );

  let eventOptions = EVENTS_TYPE;

  if (existedIdentifyEvent) {
    eventOptions = eventOptions.map(({id, ...rest}) => {
      if (id === EVENT_TYPES_VALUE.identify) {
        return {
          id,
          ...rest,
          isDisabled: true
        };
      }
      return {
        id,
        ...rest
      };
    });
  }

  if (existedPageEvent) {
    eventOptions = eventOptions.map(({id, ...rest}) => {
      if (id === EVENT_TYPES_VALUE.page) {
        return {
          id,
          ...rest,
          isDisabled: true
        };
      }
      return {
        id,
        ...rest
      };
    });
  }

  const methods = useForm({
    defaultValues: {
      status: 'active',
      type: null
    },
    resolver: validationEvent(eventsTypeTrack)
  });
  const {handleSubmit, reset, formState, watch, setValue, register} = methods;

  // local states
  const [isLoading, setIsLoading] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
  };

  useEffect(() => {
    register({name: formName.properties});
  }, [register]);

  // vars
  const eventType = watch(formName.type);
  const trackProperties = watch(formName.properties);
  const manualCollect = watch(formName.collect_type);
  const eventName = watch(formName.name);

  useEffect(() => {
    if (eventType) {
      if (ALL_TRACK_EVENTS.includes(eventType.id)) {
        setValue(formName.collect_type, true);
      }
    }
  }, [eventType, setValue]);

  useEffect(() => {
    setValue(formName.properties, []);
  }, [setValue, manualCollect]);

  // funcs
  const resetForm = useCallback(() => {
    reset({
      status: 'active',
      type: null
    });
  }, [reset]);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const onHandleSubmit = useCallback(
    async values => {
      const {
        status,
        type,
        collect_type,
        category,
        name,
        traits,
        properties,
        element,
        trackElement
      } = values;

      const submitData = {
        status,
        type: type.id,
        // collectType: collect_type ? COLLECT_TYPES.manual : COLLECT_TYPES.auto,
        collectType: COLLECT_TYPES.manual,
        name: name?.trim().length ? name : null
      };

      let propsArray = [];

      switch (type.id) {
        case EVENT_TYPES_VALUE.page:
          submitData.params = {
            category: category?.trim().length ? category : null,
            name: name?.trim().length ? name : null
          };
          submitData.collectType = collect_type
            ? COLLECT_TYPES.manual
            : COLLECT_TYPES.auto;
          propsArray = DEFAULT_EVENT_PROPERTIES.map(prop => ({
            name: prop
          }));
          break;
        case EVENT_TYPES_VALUE.identify:
          if (traits?.length) {
            const keys = traits.map(t => t.value);
            const traitObj = {};
            keys.forEach(val => (traitObj[val] = null));
            submitData.params = {
              traits: traitObj
            };
          }

          break;
        case EVENT_TYPES_VALUE.track:
        case EVENT_TYPES_VALUE.trackClick:
        case EVENT_TYPES_VALUE.trackForm:
          propsArray = properties.map(
            ({
              propertyName,
              propertyContent,
              propertyType,
              propertyPossibleValue
            }) => {
              let finalContent = '';
              switch (propertyType?.id) {
                case TYPES_VAL.element:
                  finalContent = `${TYPES_VAL.element}:${propertyContent}`;
                  break;
                case TYPES_VAL.javascript:
                  finalContent = `${TYPES_VAL.javascript}:${propertyContent}`;
                  break;
                case TYPES_VAL.xpath:
                  finalContent = `${TYPES_VAL.xpath}:${propertyContent}`;
                  break;

                default:
                  break;
              }

              return {
                name: propertyName,
                content: propertyContent ? finalContent : null,
                type: propertyType?.id ?? null,
                possibleValues: propertyPossibleValue ?? null
              };
            }
          );

          submitData.params = {
            event: name?.trim().length ? name : null
          };
          if (type.id === EVENT_TYPES_VALUE.trackClick) {
            submitData.params.element = element;
            submitData.params.elementType = trackElement;
          }
          break;

        default:
          break;
      }

      setIsLoading(true);
      try {
        const createdEvent = await createEvent({pageId, data: submitData});

        // if (propsArray.length) {
        //   let promises = [];
        //   propsArray.forEach(({name}) =>
        //     promises.push(createProperty({eventId: createdEvent.id, name}))
        //   );
        //   await Promise.all(promises);
        // }

        resetForm();
        toggle();
        toast.success('Create event successfully!', {
          closeOnClick: true
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.debug, {
          closeOnClick: true
        });
      }
    },
    [createEvent, pageId, resetForm, toggle]
  );

  const _renderFormViaEventType = () => {
    if (eventType) {
      switch (eventType.id) {
        case EVENT_TYPES_VALUE.page:
          return (
            <>
              <FormCheckbox
                name={formName.collect_type}
                label="Manual collection"
              />
              <PageEvent
                isLoading={isLoading}
                manualCollect={manualCollect}
                eventName={eventName}
              />
            </>
          );

        case EVENT_TYPES_VALUE.identify:
          return (
            <IdentifyEvent
              setValue={setValue}
              name={formName.traits}
              register={register}
              watch={watch}
              isLoading={isLoading}
            />
          );
        case EVENT_TYPES_VALUE.track:
          return (
            <>
              <FormCheckbox
                name={formName.collect_type}
                label="Manual collection"
              />
              <TrackEvent
                type={EVENT_TYPES_VALUE.track}
                isLoading={isLoading}
                toggleNested={toggleNested}
                trackProperties={trackProperties}
                manualCollect={manualCollect}
                setPropertyValue={setValue}
                fieldName={formName.properties}
                eventName={eventName}
                isCreate
              />
            </>
          );
        case EVENT_TYPES_VALUE.trackClick:
          return (
            <>
              <FormCheckbox
                name={formName.collect_type}
                label="Manual collection"
                disabled
              />
              <TrackEvent
                type={EVENT_TYPES_VALUE.trackClick}
                isLoading={isLoading}
                toggleNested={toggleNested}
                trackProperties={trackProperties}
                manualCollect={manualCollect}
                setPropertyValue={setValue}
                fieldName={formName.properties}
                eventName={eventName}
                isCreate
              />
            </>
          );

        default:
          return (
            <>
              <FormCheckbox
                name={formName.collect_type}
                label="Manual collection"
                disabled
              />
              <TrackEvent
                type={EVENT_TYPES_VALUE.trackForm}
                isLoading={isLoading}
                toggleNested={toggleNested}
                trackProperties={trackProperties}
                manualCollect={manualCollect}
                setPropertyValue={setValue}
                fieldName={formName.properties}
                eventName={eventName}
                isCreate
              />
            </>
          );
      }
    }
    return null;
  };

  return (
    <Modal
      unmountOnClose
      size="lg"
      className="modal-dialog shadow-none"
      isOpen={isOpen}
      toggle={toggle}
    >
      <FormProvider {...methods} key="create-event">
        <form
          onSubmit={handleSubmit(onHandleSubmit)}
          name="create-event"
          key="create-event"
        >
          <BlockUi tag="div" blocking={isLoading}>
            <ModalHeader>Event Information</ModalHeader>
            <ModalBody>
              <FormGroup className="d-flex justify-content-end mb-0">
                <FormToggle
                  name={formName.status}
                  defaultCheckedValue="active"
                  label="Status"
                  values={{
                    checked: 'active',
                    unChecked: 'inactive'
                  }}
                />
              </FormGroup>
              <FormReactSelect
                required
                name={formName.type}
                label="Event type"
                placeholder="Select event type..."
                optionLabelField="name"
                options={eventOptions}
              />

              {_renderFormViaEventType()}
            </ModalBody>
            <ModalFooter>
              {formState.isDirty ? (
                <ButtonLoading
                  loading={isLoading}
                  type="submit"
                  className="ml-2 btn-primary"
                  disabled={!formState.isDirty}
                >
                  Save
                </ButtonLoading>
              ) : null}

              {/* <Button color="secondary" onClick={toggle}>
                Cancel
              </Button> */}
            </ModalFooter>
          </BlockUi>
        </form>
      </FormProvider>

      <Modal unmountOnClose isOpen={nestedModal} toggle={toggleNested}>
        <Property
          toggle={toggleNested}
          setPropertyValue={setValue}
          trackProperties={trackProperties}
          fieldName={formName.properties}
          manualCollect={manualCollect}
        />
      </Modal>
    </Modal>
  );
}

export default CreateEvent;
