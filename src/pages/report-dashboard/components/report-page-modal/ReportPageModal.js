import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Label,
  Row
} from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import {FormProvider, useForm, Controller} from 'react-hook-form';
import {useCreateReportPage, useGetReportPages} from 'queries/report-page';
import {useDestructurePageOptions} from 'pages/report-dashboard/hooks';
import {USER_INFO_KEY} from 'utils/constants/auth.constants';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import ChartItem from 'pages/entity-report/chart-item';
import MetricInfo from 'pages/entity-report/metric-info';
import {METRIC_SETS} from 'constants/report';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: '#FFFFFF'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalReportPage({
  openModal = () => null,
  handleCloseModal = () => null,
  listSelectedReport = []
}) {
  const classes = useStyles();
  const {data: {items: reportPages = []} = {}} = useGetReportPages({
    params: {limit: 1000, page: 1}
  });

  const prevPages = useDestructurePageOptions({listData: reportPages});
  const methods = useForm();
  const {handleSubmit, control} = methods;
  const {mutateAsync: createReportPage} = useCreateReportPage();

  const getCurrentUser = () => {
    const currentUser = localStorage.getItem(USER_INFO_KEY);

    try {
      return JSON.parse(currentUser);
    } catch (error) {
      return null;
    }
  };

  const onSubmit = async formData => {
    const {name} = formData;
    const isNew = name?.__isNew__;
    const reportPageName = name?.label;
    const currentUser = getCurrentUser();

    // Create report page if don't exist
    if (isNew) {
      try {
        const reportIds = listSelectedReport?.map(item => item?.id);
        await createReportPage({
          name: reportPageName,
          agency_id: parseInt(currentUser?.id, 10) ?? null,
          report_ids: reportIds,
          active: true
        });
        handleCloseModal();
      } catch (error) {
        console.log(
          '🚀 ~ file: ModalCreateReport.js ~ line 130 ~ error',
          error
        );

        ShowToast.error(error?.msg || 'Fail to add page to report');
      }
      return;
    }
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={openModal}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} id="report-page-form">
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseModal}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h4" className={classes.title}>
                  Create new Report Page
                </Typography>
                <Button
                  type="submit"
                  autoFocus
                  color="inherit"
                  form="report-page-form"
                >
                  Save
                </Button>
              </Toolbar>
            </AppBar>
            <Container fluid>
              <Row className="mt-3">
                <Col>
                  <FormGroup>
                    <Label for="reportName">Name</Label>

                    <Controller
                      control={control}
                      name="name"
                      render={({onChange, onBlur, value, name}) => (
                        <CreatableSelect
                          isClearable
                          options={prevPages}
                          placeholder="Select or create a new one"
                          value={value}
                          name={name}
                          onChange={onChange}
                        />
                      )}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </form>
        </FormProvider>
        {/* Chart */}
        <Container fluid style={{backgroundColor: '#fafafa'}}>
          <Row className="mb-5">
            {listSelectedReport?.map(item => {
              const {
                id,
                metricData,
                metricSet,
                chartType,
                color,
                unit,
                distribution_by,
                metric_type,
                time_range
              } = item;
              return (
                <Col sm="6" key={`pr-${id}`} className="mb-3">
                  <Card>
                    <CardBody>
                      <ChartItem
                        series={metricData?.series}
                        categories={metricData?.categories}
                        nameOfSeries={METRIC_SETS?.[metricSet?.code]?.label}
                        chartType={chartType}
                        color={color}
                        reportId={id}
                        unit={unit}
                        metricSet={metricSet}
                      />
                      <MetricInfo
                        timeRange={time_range}
                        unit={unit}
                        distributionBy={distribution_by}
                        metricType={metric_type}
                      />
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Dialog>
    </div>
  );
}