//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

//---> Internal Modules
import {useGetAllHistorical} from 'queries/historical';
import HistoricalList from './HistoricalList';
import {LoadingIndicator} from 'components/common';
import {QueryStatuses} from 'constants/react-query';
import {getResponseData} from 'utils/helpers/misc.helpers';
import {IS_RESPONSE_ALL} from 'constants/misc';

const propTypes = {
  modal: PropTypes.bool,
  toggle: PropTypes.func,
  entityUuid: PropTypes.string,
  entityName: PropTypes.string,
  entityType: PropTypes.string
};

const Historical = ({
  modal = false,
  toggle = () => null,
  entityUuid,
  entityName,
  entityType
}) => {
  console.log("🚀 ~ file: Historical.js ~ line 32 ~ modal", modal)
  const {t} = useTranslation();
  const {data: logData, isFetching, isFetched, status} = useGetAllHistorical({
    params: {
      uuid: entityUuid,
      entity_type: entityType,
      sort: 'created_at DESC',
      per_page: 300
    },
    enabled: modal
  });
  const logList = React.useMemo(() => {
    const logs = getResponseData(logData, IS_RESPONSE_ALL) || [];
    return logs?.map(item => {
      const {id, action, created_at} = item;
      return {
        id,
        action,
        created_at
      };
    });
  }, [logData]);
  console.log(
    '🚀 ~ file: Historical.js ~ line 9 ~ Historical ~ logList',
    logList
  );

  return (
    <Modal isOpen={modal} toggle={toggle} size="lg" style={{maxWidth: 1000}}>
      <ModalHeader toggle={toggle}>{`Logs ${entityType} - ${entityName}`}</ModalHeader>
      <ModalBody>
        {isFetching && <LoadingIndicator />}
        {isFetched && status === QueryStatuses.SUCCESS && (
          <HistoricalList
            logList={logList}
            entityName={entityName}
            entityType={entityType}
          />
        )}
      </ModalBody>
      <ModalFooter>
        <Button type="button" color="link" onClick={toggle}>
          {t('COMMON.CLOSE')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

Historical.propTypes = propTypes;

export default Historical;
