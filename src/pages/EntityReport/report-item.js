import React from 'react';

import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {Checkbox} from '@material-ui/core';

import {DialogConfirm, LoadingIndicator} from 'components/common';
import ChartItem from './chart-item';
import MetricInfo from './metric-info';
import ModalCreateReport from './create-report.modal';
import {METRIC_SETS} from 'constants/report';
import {useChartData, useDefaultValues} from './hooks';
import {parseColors} from './utils';
import {DefaultColor} from './constants.js/index.js';
import './styles/styles.scss';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {ReportItemStyled} from './styled';
import {useDeleteReport} from 'queries/report';
import {useGetMetrics} from 'queries/metric/useGetMetrics';

export default function ReportItem({
  entityId,
  entityType,
  metricType,
  distributionBy,
  reportItem = {},
  isViewed = false,
  isSelected = false,
  modeSelectReport = false,
  handleSelectedReport = () => null
}) {
  const {
    uuid: reportId,
    url: reportUrl,
    properties,
    api: {unit, time_range: timeRange} = {}
  } = reportItem;
  const color = properties?.color || [DefaultColor];
  const chartType = properties?.chart_type || 'line';
  const metricSet = properties?.metric_set || [];
  const colors = parseColors(color);

  const {mutateAsync: deleteReport} = useDeleteReport();
  const {data: metrics = null, isFetched, isLoading} = useGetMetrics({
    url: reportUrl
  });
  console.log('🚀 ~ file: report-item.js ~ line 47 ~ metrics', metrics);

  const metricData = useChartData({
    type: chartType,
    metrics,
    unit,
    timeRange,
    metricSet,
    entityId: entityId
  });
  console.log('🚀 ~ file: report-item.js ~ line 56 ~ metricData', metricData);

  const defaultValues = useDefaultValues({reportItem});

  const [openModal, setOpenModal] = React.useState(false);
  const [showDialogConfirm, setShowDialogConfirm] = React.useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);

  const toggleModal = () => {
    if (!isLoading) {
      setOpenModal(prevState => !prevState);
    }
  };

  const handleOpenModal = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    if (isSelected) {
      return;
    }
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleCancelDelete = () => {
    setShowDialogConfirm(false);
  };

  const handleSubmitDelete = async () => {
    setIsLoadingDelete(true);
    try {
      await deleteReport({reportId});
      ShowToast.success('Deleted report successfully');
      setShowDialogConfirm(false);
    } catch (err) {
      ShowToast.error('Fail to delete report');
    }
    setIsLoadingDelete(false);
  };

  const onClickDelete = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    setShowDialogConfirm(true);
  };

  if (!metricData) {
    return <ReportItemStyled isLoading={isLoading}>No report</ReportItemStyled>;
  }

  return (
    <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
      <ReportItemStyled isLoading={isLoading} onClick={handleOpenModal}>
        <div className={`chx-report ${modeSelectReport ? 'd-flex' : 'd-none'}`}>
          <Checkbox
            inputProps={{'aria-label': 'primary checkbox'}}
            onChange={evt =>
              handleSelectedReport({
                evt,
                reportId,
                metricData,
                metricSet,
                chartType,
                color,
                unit,
                distribution_by: distributionBy,
                metric_type: metricType,
                time_range: timeRange
              })
            }
            onClick={evt => evt.stopPropagation()}
          />
        </div>
        {!isLoading && !isViewed && (
          <div className="delete-report">
            <Button
              type="button"
              color="link"
              onClick={onClickDelete}
              title="Delete"
            >
              <i className="pe-7s-trash"></i>
            </Button>
          </div>
        )}
        {isLoading && <LoadingIndicator type="ball-clip-rotate-multiple" />}
        {isFetched && (
          <div>
            <ChartItem
              series={metricData?.series}
              categories={metricData?.categories}
              nameOfSeries={METRIC_SETS?.[metricSet?.code]?.label}
              chartType={chartType}
              color={colors}
              reportId={reportId}
              unit={unit}
              metricSet={metricSet}
              data={metricData?.series?.[0]?.data || []}
            />
            <MetricInfo
              timeRange={timeRange}
              unit={unit}
              distributionBy={distributionBy}
              metricType={metricType}
            />
          </div>
        )}
      </ReportItemStyled>

      {openModal && defaultValues && (
        <ModalCreateReport
          modal={openModal}
          toggle={toggleModal}
          metricUrl={reportUrl}
          metricSet={metricSet}
          chartTypeDefault={chartType}
          reportItem={reportItem}
          isEdit
          defaultValues={defaultValues}
          unit={unit}
          timeRange={timeRange}
          closeModal={closeModal}
          isViewed={isViewed}
          entityType={entityType}
          metricType={metricType}
          distributionBy={distributionBy}
          entityId={entityId}
        />
      )}
      {showDialogConfirm && (
        <DialogConfirm
          open={showDialogConfirm}
          title={'Are you sure?'}
          handleClose={handleCancelDelete}
          handleAgree={handleSubmitDelete}
          isLoading={isLoadingDelete}
        />
      )}
    </div>
  );
}

ReportItem.propTypes = {
  reportUrl: PropTypes.string,
  entityId: PropTypes.string,
  entityType: PropTypes.string,
  metricType: PropTypes.string,
  distributionBy: PropTypes.string,
  reportItem: PropTypes.object,
  isViewed: PropTypes.bool,
  isSelected: PropTypes.bool,
  modeSelectReport: PropTypes.bool,
  handleSelectedReport: PropTypes.func
};
