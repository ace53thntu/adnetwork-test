//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

//---> Internal Modules
import {
  useGetAllHistorical,
  useGetLogCappingByReference
} from 'queries/historical';
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
  entityType: PropTypes.string,
  hasCapping: PropTypes.bool
};

const Historical = ({
  modal = false,
  toggle = () => null,
  entityUuid,
  entityName,
  entityType,
  hasCapping = false
}) => {
  const {t} = useTranslation();
  const {data: logData, isFetching, isFetched, status} = useGetAllHistorical({
    params: {
      uuid: entityUuid,
      entity_type: entityType,
      sort: 'created_at DESC',
      per_page: 1000
    },
    enabled: modal
  });

  const {data: cappingLogs} = useGetLogCappingByReference({
    referenceId: entityUuid,
    params: {
      entity_type: entityType,
      sort: 'created_at DESC',
      per_page: 1000
    },
    enabled: modal && !!entityUuid && hasCapping
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

  return (
    <Modal isOpen={modal} toggle={toggle} size="lg" style={{maxWidth: 1000}}>
      <ModalHeader
        toggle={toggle}
      >{`Logs ${entityType} - ${entityName}`}</ModalHeader>
      <ModalBody>
        {isFetching && <LoadingIndicator />}
        {isFetched && status === QueryStatuses.SUCCESS && (
          <HistoricalList
            logList={logList}
            cappingLogs={cappingLogs}
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
