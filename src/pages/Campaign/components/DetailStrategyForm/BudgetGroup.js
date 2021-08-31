//---> Build-in Modules
import React, {Fragment, useCallback, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Label, Row} from 'reactstrap';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Controller, useFormContext} from 'react-hook-form';

//---> Internal Modules
import {ActiveToogle, FormTextInput} from 'components/forms';

const BudgetGroup = ({viewOnly, currentStrategy}) => {
  console.log(
    '🚀 ~ file: BudgetGroup.js ~ line 12 ~ BudgetGroup ~ viewOnly',
    viewOnly
  );
  const {t} = useTranslation();

  const {control} = useFormContext();

  const [isShow, setIsShow] = useState(true);

  const handleToggleGroup = useCallback(evt => {
    evt.preventDefault();
    setIsShow(prevState => !prevState);
  }, []);

  return (
    <>
      {/* Budget Configuration*/}
      <FormGroup tag="fieldset" row className={'border border-gray'}>
        <legend
          className="col-form-label col-sm-3 w- ml-3 c-cursor-pointer"
          onClick={evt => handleToggleGroup(evt)}
          style={{width: '110px'}}
        >
          <FontAwesomeIcon
            className="mr-1 c-font-12"
            icon={isShow ? faChevronUp : faChevronDown}
          />
          Budget
        </legend>
        <Col sm={12}>
          <Row className={isShow ? '' : 'd-none'}>
            <Col md="4">
              <FormTextInput
                type="number"
                placeholder={t('global')}
                name="budget.global"
                label={t('global')}
                isRequired={false}
                disabled={viewOnly}
              />
            </Col>
            <Col md="4">
              <FormTextInput
                type="number"
                placeholder={t('daily')}
                name="budget.daily"
                label={t('daily')}
                isRequired={false}
                disabled={viewOnly}
              />
            </Col>
            <Col md="4">
              <Label className="mr-5">Smooth</Label>
              <Controller
                control={control}
                name="budget.smooth"
                render={({onChange, onBlur, value, name}) => (
                  <ActiveToogle
                    value={value}
                    onChange={onChange}
                    disabled={viewOnly}
                    name={name}
                  />
                )}
              />
            </Col>
          </Row>
        </Col>
      </FormGroup>
    </>
  );
};

export default BudgetGroup;
