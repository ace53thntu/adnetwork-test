//---> Build-in Modules
import React, {useCallback, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Row} from 'reactstrap';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//---> Internal Modules
import SelectStrategyItem from '../SelectStrategyItem';
import {useDestructureListToOptions} from '../../hooks';
// import {useGetDomainList} from 'core/queries/domain-list';

const DomainGroup = ({viewOnly = false, currentStrategy}) => {
  const {t} = useTranslation();
  // Execute APIs list
  // const {data: domains = []} = useGetDomainList();
  const domains = [];
  // Destructure data from API response
  const destructureDomains = useDestructureListToOptions({
    listData: domains,
    keyName: 'name'
  });

  // Define states
  const [isShow, setIsShow] = useState(true);

  // Handle input events
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
          Domain
        </legend>
        <Col sm={12}>
          <Row className={isShow ? '' : 'd-none'}>
            <Col md="6">
              {/* Domain black list ids */}
              <SelectStrategyItem
                name="domain_black_list_ids"
                label={t('domainBlackList')}
                placeholder={t('domainBlackList')}
                listOptions={destructureDomains}
                disabled={viewOnly}
                isMulti
                currentStrategy={currentStrategy}
              />
            </Col>
            <Col md="6">
              {/* Domain white list ids */}
              <SelectStrategyItem
                name="domain_white_list_ids"
                label={t('domainWhiteList')}
                placeholder={t('domainWhiteList')}
                listOptions={destructureDomains}
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

export default DomainGroup;
