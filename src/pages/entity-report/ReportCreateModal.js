//---> Build-in Modules
import React, {useCallback} from 'react';
// import PropTypes from 'prop-types';

//---> External Modules
import {Modal} from 'reactstrap';

//---> Internal Modules
import {initDefaultValue, mappingFormToApi} from './dto';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreateReport, useEditReport, useGetReport} from 'queries/report';
import ReportFormContent from './components/ReportFormContent';
import {QueryStatuses} from 'constants/react-query';

//---> Styles
import './styles/styles.scss';
import {
  useColorsSelectedSelector,
  useEntityNameSelector,
  useMetricsBodySelector,
  useParentPathSelector
} from 'store/reducers/entity-report';

export default function ModalReportForm({
  modal = false,
  toggle = () => {},
  metricSet = [],
  initColors = [],
  isEdit = false,
  unit,
  timeRange,
  isViewed = false,
  metricType = '',
  entityType = '',
  entityId,
  reportId
}) {
  const entityNameRedux = useEntityNameSelector();
  const parentPathRedux = useParentPathSelector();
  const colorsRedux = useColorsSelectedSelector();

  const {data: report, status} = useGetReport(reportId, !!reportId);

  const {mutateAsync: createReport} = useCreateReport({entityId, entityType});
  const {mutateAsync: updateReport} = useEditReport();
  const metricBody = useMetricsBodySelector();

  const initializeDefaultValue = initDefaultValue({
    initColors,
    metricType,
    entityType,
    sourceUuid: entityId
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
      console.log(
        '🚀 ~ file: ReportCreateModal.js ~ line 82 ~ formData',
        formData
      );
      const submitData = mappingFormToApi({
        formData,
        entityId,
        metricSet,
        metricType,
        entityType,
        entityName: entityNameRedux,
        parentPath: parentPathRedux,
        metricBody,
        colorsRedux
      });

      if (!isEdit) {
        await executeReportCreating(submitData);
      } else {
        await executeReportEditing(submitData);
      }
    },
    [
      entityId,
      metricSet,
      metricType,
      entityType,
      entityNameRedux,
      parentPathRedux,
      metricBody,
      colorsRedux,
      isEdit,
      executeReportCreating,
      executeReportEditing
    ]
  );

  if (status === QueryStatuses.LOADING) {
    return <div>Loading...</div>;
  }

  const defaultProps = {
    initializeDefaultValue,
    report,
    onSubmit,
    toggle,
    isViewed,
    isEdit,
    reportSource: entityType,
    metricSet,
    timeRange,
    entityId,
    unit
  };

  return (
    <Modal isOpen={modal} size="lg" style={{maxWidth: '1350px'}}>
      <ReportFormContent {...defaultProps} />
    </Modal>
  );
}
