//---> Build-in Modules
import React, {useCallback, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Row} from 'reactstrap';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//---> Internal Modules
// import {useGetKeywordsLists} from 'core/queries';
import SelectStrategyItem from '../SelectStrategyItem';
import {useDestructureListToOptions} from '../../hooks';

const KeywordGroup = ({viewOnly = false, currentStrategy}) => {
  const {t} = useTranslation();
  // Execute API
  // const {data: keywordsLists = []} = useGetKeywordsLists();
  const keywordsLists = [];

  // Destructure data from API response
  const destructureKeywordsLists = useDestructureListToOptions({
    listData: keywordsLists,
    keyName: 'name'
  });

  const [isShow, setIsShow] = useState(true);

  const handleToggleGroup = useCallback(evt => {
    evt.preventDefault();
    setIsShow(prevState => !prevState);
  }, []);

  return (
    <>
      <FormGroup tag="fieldset" row className="border border-gray">
        <legend
          className="col-form-label col-sm-2 ml-3 w-130px c-cursor-pointer"
          onClick={evt => handleToggleGroup(evt)}
        >
          <FontAwesomeIcon
            className="mr-1 c-font-12"
            icon={isShow ? faChevronUp : faChevronDown}
          />{' '}
          Keywords
        </legend>
        <Col sm={12}>
          <Row className={isShow ? '' : 'd-none'}>
            <Col md="6">
              <SelectStrategyItem
                isRequired={false}
                name="keywords_white_list_ids"
                label={t('keywordWhiteListIds')}
                placeholder={t('keywordWhiteListIds')}
                listOptions={destructureKeywordsLists}
                disabled={viewOnly}
                isMulti
                currentStrategy={currentStrategy}
              />
            </Col>
            <Col md="6">
              <SelectStrategyItem
                isRequired={false}
                name="keywords_black_list_ids"
                label={t('keywordBackListIds')}
                placeholder={t('keywordBackListIds')}
                listOptions={destructureKeywordsLists}
                disabled={viewOnly}
                isMulti
                currentStrategy={currentStrategy}
              />
            </Col>
          </Row>
        </Col>
      </FormGroup>
    </>
  );
};

export default KeywordGroup;
