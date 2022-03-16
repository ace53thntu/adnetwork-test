//---> Build-in Modules
import React, {useCallback} from 'react';
// import PropTypes from 'prop-types';

//---> External Modules
import {Modal} from 'reactstrap';

//---> Internal Modules
import {initDefaultValue, mappingFormToApi} from './dto';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreateReport, useEditReport, useGetReport} from 'queries/report';
import ReportFormConcent from './components/form/ReportFormContent';
import './styles/styles.scss';
import {QueryStatuses} from 'constants/react-query';

export default function ModalReportForm({
  modal = false,
  toggle = () => {},
  metricSet = [],
  initColors = [],
  isEdit = false,
  defaultValues: currentReport = {},
  unit,
  timeRange,
  isViewed = false,
  metricType = '',
  distributionBy = '',
  entityType = '',
  entityId,
  ownerRole,
  ownerId,
  reportId
}) {
  const {data: report, status, error} = useGetReport(reportId, !!reportId);

  const {mutateAsync: createReport} = useCreateReport({entityId, entityType});
  const {mutateAsync: updateReport} = useEditReport();

  const initializeDefaultValue = initDefaultValue({
    initColors,
    metricType,
    distributionBy,
    entityType
  });

  const executeReportCreating = useCallback(
    async submitData => {
      try {
        await createReport(submitData);
        ShowToast.success('Created report successfully');
        toggle();
      } catch (error) {
        ShowToast.error(error?.msg || 'Fail to create report');
      }
    },
    [createReport, toggle]
  );

  const executeReportEditing = useCallback(
    async submitData => {
      try {
        await updateReport({reportId: report?.uuid, data: submitData});
        ShowToast.success('Updated report successfully');
        toggle();
      } catch (error) {
        ShowToast.error(error?.msg || 'Fail to update report');
      }
    },
    [report?.uuid, toggle, updateReport]
  );
  const onSubmit = useCallback(
    async formData => {
      const submitData = mappingFormToApi({
        formData,
        entityId,
        metricSet,
        metricType,
        entityType,
        ownerRole,
        ownerUuid: ownerId
      });
      console.log(
        '🚀 ~ file: create-report.modal.js ~ line 131 ~ submitData',
        submitData
      );
      if (!isEdit) {
        await executeReportCreating(submitData);
      } else {
        await executeReportEditing(submitData);
      }
    },
    [
      isEdit,
      executeReportEditing,
      executeReportCreating,
      entityId,
      metricSet,
      metricType,
      entityType,
      ownerId,
      ownerRole
    ]
  );

  if (status === QueryStatuses.LOADING) {
    return <div>Loading...</div>;
  }

  if (status === QueryStatuses.ERROR) {
    return <span>Error: {error.msg}</span>;
  }

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      size="lg"
      style={{maxWidth: '1350px'}}
    >
      <ReportFormConcent
        initializeDefaultValue={initializeDefaultValue}
        report={report}
        onSubmit={onSubmit}
        toggle={toggle}
        isViewed={isViewed}
        isEdit={isEdit}
        reportSource={entityType}
        metricSet={metricSet}
        timeRange={timeRange}
        entityId={entityId}
        unit={unit}
      />
    </Modal>
  );
}
