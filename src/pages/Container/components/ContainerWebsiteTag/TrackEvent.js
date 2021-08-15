import {Button, Card, CardHeader, ListGroup, ListGroupItem} from 'reactstrap';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

import AndroidTrackSnippet from './AndroidTrackSnippet';
import Code from './Code';
import {EVENT_TYPES_VALUE} from 'pages/Container/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import IOSTrackSnippet from './IOSTrackSnippet';
import {TAG_FROM_SOURCE} from '../ContainerTree/constants';
import TrackElementInput from './TrackElementInput';
import {useDeleteProperty} from 'pages/Container/hooks/useDeleteEventProperty';
import {useParams} from 'react-router';
import {FormTextInput} from 'components/forms';

function TrackEvent({
  isLoading,
  toggleNested = () => {},
  trackProperties = [],
  manualCollect,
  type,
  setPropertyValue = () => {},
  fieldName,
  eventName,
  isUpdate = false,
  setCurrentPropId,
  togglePropDetailModal,
  isCreate = false
}) {
  const {tag} = useParams();
  const [deleteProperty] = useDeleteProperty();

  const [isDeleting, setIsDeleting] = useState(false);

  const isAndroidSource = tag === TAG_FROM_SOURCE.android;
  const isIOSSource = tag === TAG_FROM_SOURCE.ios;

  const hasTrackProps = Object.keys(trackProperties).length;
  const currentEventName = useMemo(() => {
    return eventName?.length ? `"${eventName}"` : 'eventName';
  }, [eventName]);

  const propsByManualCollect = useMemo(() => {
    if (!manualCollect) {
      return trackProperties;
    } else {
      return trackProperties.map(item => {
        return {
          ...item,
          propertyContent: '// your value'
        };
      });
    }
  }, [manualCollect, trackProperties]);

  const currentProperties = useMemo(() => {
    let propObj = ``;
    if (propsByManualCollect.length) {
      propsByManualCollect.forEach(
        ({propertyName, propertyContent, propertyPossibleValue}, index) => {
          const value = propertyContent?.length
            ? propertyContent
            : propertyPossibleValue?.length
            ? `"${propertyPossibleValue}"`
            : '// your value';
          if (index === 0) {
            if (index === propsByManualCollect.length - 1) {
              propObj = propObj + `${propertyName}: ${value}`;
            } else {
              propObj = propObj + `${propertyName}: ${value},`;
            }
          } else {
            if (index === propsByManualCollect.length - 1) {
              propObj =
                propObj +
                `
    ${propertyName}: ${value}`;
            } else {
              propObj =
                propObj +
                `
    ${propertyName}: ${value},`;
            }
          }
        }
      );
    } else {
      propObj = '...properties';
    }

    return propObj;
  }, [propsByManualCollect]);

  const onHandleDeleteProperty = useCallback(
    async propId => {
      if (!isUpdate) {
        const filtered = trackProperties.filter(prop => prop.id !== propId);

        setPropertyValue(fieldName, filtered, {
          shouldDirty: true,
          shouldValidate: true
        });
      } else {
        setIsDeleting(true);
        try {
          await deleteProperty(propId);
          setIsDeleting(false);
          const filtered = trackProperties.filter(prop => prop.id !== propId);

          setPropertyValue(fieldName, filtered, {
            // shouldDirty: true,
            // shouldValidate: true
          });
        } catch (error) {
          setIsDeleting(false);
        }
      }
    },
    [deleteProperty, fieldName, isUpdate, setPropertyValue, trackProperties]
  );

  return (
    <>
      {type === EVENT_TYPES_VALUE.trackClick ? <TrackElementInput /> : null}
      <FormTextInput
        isRequired
        // disable={isLoading || isUpdate}
        disable={isLoading}
        name="name"
        placeholder="Event name..."
        label="Event name"
        autoComplete="off"
      />

      {hasTrackProps ? (
        <Card className="main-card mb-3">
          <CardHeader>Properties</CardHeader>
          <ListGroup className="todo-list-wrapper" flush>
            {trackProperties.map(property => {
              return (
                <ListGroupItem key={property.id} disabled={isDeleting}>
                  <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left">
                        <div className="widget-heading">
                          {property.propertyName}
                          {property?.propertyType?.name ? (
                            <div className="badge badge-info ml-2">
                              {property.propertyType.name}
                            </div>
                          ) : null}
                        </div>
                        <div className="widget-subheading">
                          {manualCollect
                            ? '// your value'
                            : property.propertyContent?.length
                            ? property.propertyContent
                            : property?.propertyPossibleValue?.length
                            ? property.propertyPossibleValue
                            : '// your value'}
                        </div>
                      </div>

                      <div className="widget-content-right widget-content-actions">
                        {!isCreate && (
                          <Button
                            outline
                            className="border-0 btn-transition"
                            color="success"
                            type="button"
                            onClick={() => {
                              setCurrentPropId?.(property.id);
                              togglePropDetailModal?.();
                            }}
                          >
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </Button>
                        )}

                        <Button
                          outline
                          className="border-0 btn-transition"
                          color="danger"
                          type="button"
                          onClick={() => onHandleDeleteProperty(property.id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Card>
      ) : null}

      <div className="d-flex justify-content-end">
        <Button
          color="success"
          className="btn-icon"
          type="button"
          onClick={toggleNested}
        >
          <i className="pe-7s-plus btn-icon-wrapper"> </i>
          Add property
        </Button>
      </div>
      {isAndroidSource && (
        <AndroidTrackSnippet
          eventName={currentEventName}
          properties={propsByManualCollect}
        />
      )}
      {isIOSSource && (
        <IOSTrackSnippet
          eventName={currentEventName}
          properties={propsByManualCollect}
        />
      )}
      {!isAndroidSource && !isIOSSource && (
        <Code>
          {`AicactusSDK.${type}(${
            type === EVENT_TYPES_VALUE.trackClick ? 'element' : currentEventName
          },${
            type === EVENT_TYPES_VALUE.trackClick ? ` ${currentEventName},` : ''
          } {
    ${currentProperties}
});`}
        </Code>
      )}
    </>
  );
}

export default memo(TrackEvent);
