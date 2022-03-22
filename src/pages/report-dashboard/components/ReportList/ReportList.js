//---> Build-in modules
import React, {useCallback, useState} from 'react';

//---> External Modules
import {Card, CardBody, Col, Row} from 'reactstrap';
import {useParams} from 'react-router-dom';

//---> Internal Modules
import ModalReportPage from '../report-page-modal';
import {ReportContainerStyled} from './styled';
import {LoadingIndicator} from 'components/common';
import {Pagination} from 'components/list/pagination';
import {IS_RESPONSE_ALL} from 'constants/misc';
import ReportItemContainer from 'pages/entity-report/ReportItemContainer';
import {checkIsFollowed} from 'pages/report-dashboard/helpers';
import {useDestructureReports} from 'pages/report-dashboard/hooks';
import {useGetReportsInfinite} from 'queries/report';
import {useFollowReportPage} from 'queries/report-page';
import {ActionFooter, ActionHeader} from '../actions';
import {validArray} from 'utils/helpers/dataStructure.helpers';
import {getResponseData} from 'utils/helpers/misc.helpers';
import {getUser} from 'utils/helpers/auth.helpers';

const PER_PAGE = 10;
const PAGE = 0;

const ReportList = ({pageDetails = {}}) => {
  const currentUser = getUser();
  const {pageId} = useParams();
  let params = {
    per_page: PER_PAGE,
    status: 'active',
    page: PAGE,
    sort: 'updated_at DESC'
  };
  if (pageId) {
    params = {...params, report_page_id: pageId};
  }

  const {
    data: {pages = []} = {},
    isLoading: isLoadingReport,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useGetReportsInfinite({
    params,
    enabled: true
  });
  const reports = React.useMemo(() => {
    return pages?.reduce((acc, page) => {
      const items = getResponseData(page, IS_RESPONSE_ALL);
      return [...acc, ...items];
    }, []);
  }, [pages]);

  const destructureReports = useDestructureReports({
    reports
  });
  const {mutateAsync: followPage} = useFollowReportPage(pageId);

  //---> Local States
  const [showSelect, setShowSelect] = useState(false);
  const [modeSelectReport, setModeSelectReport] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);

  React.useEffect(() => {
    const followed = checkIsFollowed({page: pageDetails, currentUser});

    setIsFollowed(followed);
  }, [currentUser, pageDetails]);

  const handleToggleModal = () => {
    setOpenModal(prevState => !prevState);
  };

  const handleCloseModal = () => {
    setModeSelectReport(false);
    setShowSelect(false);
    setSelectedReport([]);
    setOpenModal(false);
  };

  const handleShowSelect = useCallback(() => {
    setShowSelect(prevState => !prevState);
  }, []);

  const handleOnClickSelectReport = useCallback(() => {
    setModeSelectReport(prevState => !prevState);
  }, []);

  const handleSelectedReport = ({evt, reportId, ...rest}) => {
    evt.preventDefault();
    let newList = [];
    if (evt.target.checked) {
      newList = [...selectedReport].concat({
        id: parseInt(reportId, 10),
        ...rest
      });
    } else {
      newList = [...selectedReport].filter(
        item => parseInt(item?.id, 10) !== parseInt(reportId, 10)
      );
    }
    setSelectedReport([...newList]);
  };

  async function onFollowPage(evt) {
    evt.preventDefault();
    const data = {
      report_page_id: parseInt(pageId, 10),
      action: isFollowed ? 'unfavorite' : 'favorite'
    };
    try {
      await followPage(data);
      setIsFollowed(prevState => !prevState);
    } catch (err) {
      console.log(
        '🚀 ~ file: ReportList.js ~ line 86 ~ onFollowPage ~ err',
        err
      );
    }
  }

  return (
    <div className="report-wrap" id="scrollableDiv">
      <ReportContainerStyled fluid>
        {isLoadingReport && <LoadingIndicator />}

        {/* Header Actions */}
        <Row className="mb-3 ">
          <Col sm={12}>
            <ActionHeader
              reports={destructureReports}
              pageId={pageId}
              showSelect={showSelect}
              onSelectReport={handleOnClickSelectReport}
              modeSelectReport={modeSelectReport}
              handleShowSelect={handleShowSelect}
              isFollowed={isFollowed}
              onFollowPage={onFollowPage}
            />
          </Col>
        </Row>

        {/* Load list reports */}
        <Row>
          {validArray({list: destructureReports}) ? (
            [...destructureReports]?.map((reportItem = {}) => {
              const {uuid: id, status} = reportItem;

              return status === 'active' ? (
                <Col key={`pr-${id}`} sm={6} className="mb-3">
                  <Card className="chart-item">
                    <CardBody style={{padding: 0}}>
                      <ReportItemContainer
                        report={reportItem}
                        handleSelectedReport={handleSelectedReport}
                      />
                    </CardBody>
                  </Card>
                </Col>
              ) : null;
            })
          ) : (
            <Col sm={12}>
              <div
                style={{
                  textAlign: 'center',
                  fontWeight: 600,
                  width: '100%',
                  backgroundColor: 'hsl(0,0%,95%)',
                  padding: '15px 0'
                }}
              >
                No report
              </div>
            </Col>
          )}
        </Row>
        {/* </InfiniteScroll> */}

        {hasNextPage && (
          <Pagination
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}

        {selectedReport?.length > 0 ? (
          <ActionFooter onClickCreateReport={handleToggleModal} />
        ) : null}
      </ReportContainerStyled>
      {openModal ? (
        <ModalReportPage
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          listSelectedReport={selectedReport}
        />
      ) : null}
    </div>
  );
};

export default ReportList;
