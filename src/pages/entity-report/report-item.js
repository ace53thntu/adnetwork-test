//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {Checkbox} from '@material-ui/core';

//---> Internal Modules
import ChartItem from './chart-item';
import {DefaultColor} from './constants.js/index.js';
import ModalReportForm from './create-report.modal';
import {useChartData} from './hooks';
import MetricInfo from './metric-info';
import {ReportItemStyled} from './styled';
import {parseColors} from './utils';
import {DialogConfirm, LoadingIndicator} from 'components/common';
import {METRIC_SETS} from 'constants/report';
import {useDeleteReport} from 'queries/report';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import './styles/styles.scss';
import {useDispatch} from 'react-redux';
import {setMetricBodyRedux} from 'store/reducers/entity-report';
import {getMetricRequestBody} from './utils/metricRequest';
import {getReportById} from './utils/getReportById';

export default function ReportItem({
  entityId,
  entityType,
  metricType,
  distributionBy,
  reportItem = {},
  isViewed = false,
  isSelected = false,
  modeSelectReport = false,
  handleSelectedReport = () => null,
  metrics = null,
  isFetching = true
}) {
  const dispatch = useDispatch();
  const {
    uuid: reportId,
    properties,
    api: {time_unit: unit, time_range: timeRange, report_by} = {},
    report_source
  } = reportItem;
  const metricRequestBody = getMetricRequestBody({report: reportItem});

  const color = properties?.color || [DefaultColor];
  const chartType = properties?.chart_type || 'line';
  const metricSet = properties?.metric_set || [];
  const colors = parseColors(color);
  const reportByUuid = getReportById({report: reportItem, entityId});

  const {mutateAsync: deleteReport} = useDeleteReport();

  const metricData = useChartData({
    type: chartType,
    metrics,
    unit,
    timeRange,
    metricSet,
    entityId: reportByUuid
  });

  const [openModal, setOpenModal] = React.useState(false);
  const [showDialogConfirm, setShowDialogConfirm] = React.useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);

  const toggleModal = () => {
    if (!isFetching) {
      setOpenModal(prevState => !prevState);
    }
  };

  const handleOpenModal = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    if (isSelected) {
      return;
    }
    dispatch(setMetricBodyRedux(metricRequestBody));
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

  return (
    <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
      <ReportItemStyled isLoading={isFetching} onClick={handleOpenModal}>
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
        {!isFetching && !isViewed && (
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
        {isFetching && <LoadingIndicator type="ball-clip-rotate-multiple" />}
        {metricData ? (
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
              reportSource={report_source}
              reportBy={report_by}
            />
          </div>
        ) : (
          <div className="no-report">No report</div>
        )}
      </ReportItemStyled>

      {openModal && (
        <ModalReportForm
          modal={openModal}
          toggle={toggleModal}
          metricSet={metricSet}
          chartTypeDefault={chartType}
          reportItem={reportItem}
          isEdit
          unit={unit}
          timeRange={timeRange}
          closeModal={closeModal}
          isViewed={isViewed}
          entityType={entityType}
          metricType={metricType}
          distributionBy={distributionBy}
          entityId={entityId}
          reportId={reportId}
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
