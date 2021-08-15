import React, {useCallback, useEffect, useMemo, useState} from 'react';
import BlockUi from 'react-block-ui';
import {useForm, FormProvider} from 'react-hook-form';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Modal
} from 'reactstrap';
import {v4 as uuidv4} from 'uuid';

// components
import IdentifyEvent from './IdentifyEvent';
import PageEvent from './PageEvent';
import TrackEvent from './TrackEvent';
import Property from './Property';
import PropertyDetail from './PropertyDetail';

import {EVENTS_TYPE, EVENT_TYPES_VALUE} from '../../constants';
import {validationEvent} from './validations';
import {useGetEvent} from 'pages/Container/hooks/useEvent';

import useUpdateEvent from 'pages/Container/hooks/useUpdateEvent';
import {PROPERTIES_OPTIONS, TYPES_VAL} from './constants';
import {FormCheckbox, FormReactSelect, FormToggle} from 'components/forms';
import {ButtonLoading} from 'components/common';
import {ShowToast} from 'utils/helpers/showToast.helpers';

const COLLECT_TYPES = {
  auto: 'auto',
  manual: 'manual'
};

const formName = {
  properties: 'properties',
  status: 'status',
  type: 'type',
  collect_type: 'collectType',
  traits: 'traits',
  name: 'name'
};

export default function UpdateEvent({
  toggle = () => {},
  eventId = null,
  pageId
}) {
  const {data: event, isFetching} = useGetEvent({eventId});
  if (isFetching) {
    return (
      <>
        <ModalHeader>Event Information</ModalHeader>
        <ModalBody>
          <div>Loading...</div>
        </ModalBody>
      </>
    );
  }

  return <FormUpdate toggle={toggle} event={event} pageId={pageId} />;
}

function FormUpdate({toggle, event = {}, pageId}) {
  const traits = useMemo(() => {
    if (event?.params?.traits) {
      return Object.keys(event.params.traits).map(key => ({
        id: uuidv4(),
        value: key
      }));
    }
    return [];
  }, [event?.params?.traits]);

  const props = useMemo(() => {
    return event?.properties
      ? event.properties.map(
          ({content, name, possibleValues = null, type, id}) => {
            return {
              propertyName: name,
              propertyType: type
                ? PROPERTIES_OPTIONS.find(tp => tp.id === type)
                : null,
              propertyContent: content,
              propertyPossibleValue: possibleValues,
              id
            };
          }
        )
      : [];
  }, [event.properties]);

  const defaultValues = useMemo(() => {
    const values = {
      status: event.status,
      type: EVENTS_TYPE.filter(tp => tp.id === event.type)[0],
      collectType: event?.collectType === 'manual' ? true : false
    };
    switch (event.type) {
      case EVENT_TYPES_VALUE.page:
        values.name = event?.name ?? event?.params?.name ?? '';
        values.category = event?.params?.category ?? '';
        values.properties = props;
        break;
      case EVENT_TYPES_VALUE.trackClick:
        values.name = event?.name ?? event?.params?.event ?? '';
        values.properties = props;
        values.element = event?.params?.element;
        values.elementType = event?.params?.elementType;
        break;
      case EVENT_TYPES_VALUE.track:
      case EVENT_TYPES_VALUE.trackForm:
        values.name = event?.name ?? event?.params?.event ?? '';
        values.properties = props;
        break;
      case EVENT_TYPES_VALUE.identify:
        values.traits = traits;
        break;
      default:
        break;
    }
    return values;
  }, [
    event?.collectType,
    event?.name,
    event?.params?.category,
    event?.params?.element,
    event?.params?.elementType,
    event?.params?.event,
    event?.params?.name,
    event.status,
    event.type,
    props,
    traits
  ]);

  const methods = useForm({
    defaultValues,
    resolver: validationEvent([], true)
  });
  const {handleSubmit, formState, watch, setValue, register} = methods;

  const [updateEvent] = useUpdateEvent();

  // local states
  const [isLoading, setIsLoading] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [showPropDetailModal, setShowPropDetailModal] = useState(false);
  const [currentPropId, setCurrentPropId] = useState(null);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
  };

  const togglePropDetailModal = () => {
    setShowPropDetailModal(!showPropDetailModal);
  };

  useEffect(() => {
    register({name: formName.properties});
  }, [register]);

  // vars
  const eventType = watch(formName.type);
  const trackProperties = watch(formName.properties);
  const manualCollect = watch(formName.collect_type);
  const eventName = watch(formName.name);

  const onHandleSubmit = useCallback(
    async values => {
      const {
        status,
        type,
        // collectType,
        category,
        name,
        properties,
        traits,
        element,
        trackElement
      } = values;
      const submitData = {
        status,
        type: type.id,
        // collectType: collectType ? COLLECT_TYPES.manual : COLLECT_TYPES.auto,
        collectType: COLLECT_TYPES.manual,
        pageId,
        name
      };
      switch (type.id) {
        case EVENT_TYPES_VALUE.page:
          submitData.params = {
            category: category?.length ? category : null,
            // name: defaultValues.name
            name
          };
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
          const propsArray = properties.map(
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
                possibleValues: propertyPossibleValue
              };
            }
          );
          submitData.params = {
            event: defaultValues.name,
            properties: propsArray
          };
          if (type.id === EVENT_TYPES_VALUE.trackClick) {
            submitData.params.element = element;
            submitData.params.elementType = trackElement;
          }
          break;
        default:
          break;
      }
      console.log('---submitData: ', submitData);
      setIsLoading(true);
      try {
        await updateEvent({eventId: event.id, data: submitData});
        toggle();
        ShowToast.success('Update event successfully!', {
          closeOnClick: true
        });
      } catch (error) {
        console.log('onHandleSubmit -> error', error);
        ShowToast.error(error, {
          closeOnClick: true
        });
      } finally {
        setIsLoading(false);
      }
    },
    [defaultValues.name, event.id, pageId, toggle, updateEvent]
  );

  const _renderFormViaEventType = () => {
    if (eventType) {
      switch (eventType.id) {
        case EVENT_TYPES_VALUE.page:
          return (
            <PageEvent
              isLoading={isLoading}
              manualCollect={manualCollect}
              properties={trackProperties}
              eventName={eventName}
            />
          );

        case EVENT_TYPES_VALUE.identify:
          return (
            <IdentifyEvent
              setValue={setValue}
              name={formName.traits}
              register={register}
              watch={watch}
            />
          );

        case EVENT_TYPES_VALUE.track:
          return (
            <>
              <FormCheckbox
                disabled
                name={formName.collect_type}
                label="Manual collection"
              />
              <TrackEvent
                isUpdate
                type={EVENT_TYPES_VALUE.track}
                isLoading={isLoading}
                toggleNested={toggleNested}
                trackProperties={trackProperties}
                manualCollect={manualCollect}
                setPropertyValue={setValue}
                fieldName={formName.properties}
                eventName={eventName}
                setCurrentPropId={setCurrentPropId}
                togglePropDetailModal={togglePropDetailModal}
              />
            </>
          );
        case EVENT_TYPES_VALUE.trackClick:
          return (
            <>
              <FormCheckbox
                disabled
                name={formName.collect_type}
                label="Manual collection"
              />
              <TrackEvent
                isUpdate
                type={EVENT_TYPES_VALUE.trackClick}
                isLoading={isLoading}
                toggleNested={toggleNested}
                trackProperties={trackProperties}
                manualCollect={manualCollect}
                setPropertyValue={setValue}
                fieldName={formName.properties}
                eventName={eventName}
                setCurrentPropId={setCurrentPropId}
                togglePropDetailModal={togglePropDetailModal}
              />
            </>
          );

        default:
          return (
            <>
              <FormCheckbox
                disabled
                name={formName.collect_type}
                label="Manual collection"
              />
              <TrackEvent
                isUpdate
                type={EVENT_TYPES_VALUE.trackForm}
                isLoading={isLoading}
                toggleNested={toggleNested}
                trackProperties={trackProperties}
                manualCollect={manualCollect}
                setPropertyValue={setValue}
                fieldName={formName.properties}
                eventName={eventName}
                setCurrentPropId={setCurrentPropId}
                togglePropDetailModal={togglePropDetailModal}
              />
            </>
          );
      }
    }
    return null;
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <BlockUi tag="div" blocking={isLoading}>
            <ModalHeader>Event Information</ModalHeader>
            <ModalBody>
              <FormGroup className="d-flex justify-content-end mb-0">
                <FormToggle
                  name={formName.status}
                  label="Status"
                  values={{
                    checked: 'active',
                    unChecked: 'inactive'
                  }}
                  disabled={false}
                  defaultCheckedValue={defaultValues.status}
                />
              </FormGroup>
              <FormReactSelect
                required
                disabled
                name={formName.type}
                label="Event type"
                placeholder="Select event type..."
                optionLabelField="name"
                options={EVENTS_TYPE}
                defaultValue={defaultValues.type}
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
          eventId={event.id}
        />
      </Modal>

      <Modal
        unmountOnClose
        isOpen={showPropDetailModal}
        toggle={togglePropDetailModal}
      >
        <PropertyDetail
          toggle={togglePropDetailModal}
          setPropertyValue={setValue}
          properties={trackProperties}
          fieldName={formName.properties}
          manualCollect={manualCollect}
          eventId={event.id}
          currentPropId={currentPropId}
        />
      </Modal>
    </>
  );
}
