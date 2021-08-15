import {
  Button,
  Card,
  CardHeader,
  Input,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import React, {useCallback, useEffect, useMemo, useState} from 'react';

import AndroidIdentifySnippet from './AndroidIdentifySnippet';
import Code from './Code';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import IOSIdentifySnippet from './IOSIdentifySnippet';
import {TAG_FROM_SOURCE} from '../ContainerTree/constants';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {useParams} from 'react-router';
import {v4 as uuidv4} from 'uuid';

export default function IdentifyEvent({
  setValue,
  name,
  register,
  watch,
  isLoading
}) {
  const {tag} = useParams();
  const [traits, setTraits] = useState(watch(name) || []);

  const [trait, setTrait] = useState('');
  const [traitError, setTraitError] = useState(null);

  const isAndroidSource = tag === TAG_FROM_SOURCE.android;
  const isIOSSource = tag === TAG_FROM_SOURCE.ios;

  useEffect(() => {
    register({name});
  }, [name, register]);

  const currentProperties = useMemo(() => {
    let propObj = ``;
    if (traits.length) {
      traits.forEach(({id, value}, index) => {
        if (index === 0) {
          if (index === traits.length - 1) {
            propObj = propObj + `${value}: // your value`;
          } else {
            propObj = propObj + `${value}: // your value,`;
          }
        } else {
          if (index === traits.length - 1) {
            propObj =
              propObj +
              `
    ${value}: // your value`;
          } else {
            propObj =
              propObj +
              `
    ${value}: // your value,`;
          }
        }
      });
    } else {
      propObj = '';
    }

    return propObj;
  }, [traits]);

  const onHandleChangeTrait = useCallback(e => {
    setTraitError(null);
    setTrait(e.target.value);
  }, []);

  const addTrait = useCallback(() => {
    const canAdd = traits.every(({value}) => value !== trait.trim());
    if (canAdd) {
      setTrait('');
      if (trait?.length) {
        const newTraits = [
          ...traits,
          {
            id: uuidv4(),
            value: trait
          }
        ];

        setTraits(newTraits);
        setValue(name, newTraits, {
          shouldDirty: true,
          shouldValidate: true
        });
      }
    } else {
      setTraitError('Duplicate trait name!');
    }
  }, [name, setValue, trait, traits]);

  const onHandlePressAddTrait = useCallback(
    evt => {
      if (evt.key === 'Enter') {
        evt.stopPropagation();
        evt.preventDefault();
        addTrait();
      }
    },
    [addTrait]
  );

  const onHandleDeleteTrait = useCallback(
    traitId => {
      const newTraits = traits.filter(trait => trait.id !== traitId);
      setTraits(newTraits);
      setValue(name, newTraits, {
        shouldDirty: true,
        shouldValidate: true
      });
    },
    [name, setValue, traits]
  );

  return (
    <>
      <div className="mb-2">
        <span className="text-warning font-weight-bold">
          You must call identify manually
        </span>
      </div>
      {isAndroidSource && <AndroidIdentifySnippet traits={traits} />}
      {isIOSSource && <IOSIdentifySnippet traits={traits} />}
      {!isAndroidSource && !isIOSSource && (
        <Code>{`AicactusSDK.identify([userId], ${
          currentProperties?.length
            ? `{
    ${currentProperties}
}`
            : `[traits]`
        });`}</Code>
      )}

      <Card className="main-card mb-3">
        <CardHeader>Traits</CardHeader>
        <ListGroup className="todo-list-wrapper" flush>
          {traits.map(trait => {
            return (
              <ListGroupItem key={trait.id}>
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left">
                      <div className="widget-heading">{trait.value}</div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button
                        outline
                        className="border-0 btn-transition"
                        color="danger"
                        type="button"
                        onClick={() => onHandleDeleteTrait(trait.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
            );
          })}

          <ListGroupItem>
            <div className="widget-content p-0">
              <InputGroup>
                <Input
                  placeholder="New trait"
                  onKeyPress={onHandlePressAddTrait}
                  value={trait}
                  onChange={onHandleChangeTrait}
                  disabled={isLoading}
                />
                <InputGroupAddon addonType="append">
                  <Button color="success" onClick={addTrait} type="button">
                    Add new trait
                  </Button>
                </InputGroupAddon>
              </InputGroup>

              {traitError ? (
                <span className="text-danger">{traitError}</span>
              ) : null}
            </div>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </>
  );
}
