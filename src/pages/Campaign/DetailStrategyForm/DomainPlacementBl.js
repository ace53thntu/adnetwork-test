//---> Build-in Modules
import React, {useCallback, useState} from 'react';

//---> External Modules
import {Col, FormGroup, Row} from 'reactstrap';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//---> Internal Modules
import SelectStrategyItem from '../components/SelectStrategyItem';
import {useDestructureListToOptions} from '../hooks';
// import {useGetDomains} from 'core/queries/domain';

const DomainPlacementBlackListGroup = ({viewOnly = false, currentStrategy}) => {
  // Execute APIs list
  // const {data: domains = []} = useGetDomains();
  const domains = [];

  // Destructure data from API response
  const destructureDomains = useDestructureListToOptions({
    listData: domains,
    keyName: 'domain'
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
          className="col-form-label col-sm-3 ml-3 w-130px c-cursor-pointer"
          onClick={evt => handleToggleGroup(evt)}
          style={{width: '270px'}}
        >
          <FontAwesomeIcon
            className="mr-1 c-font-12"
            icon={isShow ? faChevronUp : faChevronDown}
          />{' '}
          Domain Placement Black List
        </legend>
        <Col sm={12}>
          <Row className={isShow ? '' : 'd-none'}>
            <Col md="6">
              {/* Domain black list ids */}
              <SelectStrategyItem
                isRequired={false}
                name="domain_placement_bl.domain_id"
                label={'Domain'}
                placeholder={'Domain'}
                listOptions={destructureDomains}
                disabled={viewOnly}
                isMulti={false}
                currentStrategy={currentStrategy}
              />
            </Col>
            <Col md="6">
              {/* Domain white list ids */}
              <SelectStrategyItem
                isRequired={false}
                name="domain_placement_bl.placement_ids"
                label={'Placements'}
                placeholder={'Placements'}
                listOptions={[]}
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

export default DomainPlacementBlackListGroup;
