import {Card, CardHeader, ListGroup, ListGroupItem} from 'reactstrap';

import Code from './Code';
import React from 'react';
import {TAG_FROM_SOURCE} from '../ContainerTree/constants';
import {useParams} from 'react-router';
import {FormTextInput} from 'components/forms';

export default function PageEvent({
  manualCollect,
  isLoading,
  properties = [],
  eventName
}) {
  const {tag} = useParams();
  const hasProps = properties?.length;
  const isAndroidSource = tag === TAG_FROM_SOURCE.android;
  const isIOSSource = tag === TAG_FROM_SOURCE.ios;

  return (
    <>
      <FormTextInput
        name="name"
        placeholder="The name of the page..."
        label="Name"
      />

      {hasProps ? (
        <Card className="main-card mb-3">
          <CardHeader>Properties</CardHeader>
          <ListGroup className="todo-list-wrapper" flush>
            {properties.map(property => {
              return (
                <ListGroupItem key={property.id}>
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
                      </div>
                    </div>
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Card>
      ) : null}
      {!isAndroidSource && !isIOSSource && (
        <Code>{`AicactusSDK.page("${eventName}")`}</Code>
      )}
    </>
  );
}
