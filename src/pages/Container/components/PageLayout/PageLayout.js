import React, {useCallback, useState} from 'react';
import {Row, Col, Card, CardBody, CardHeader, Modal, Button} from 'reactstrap';
import {useNavigate, useParams} from 'react-router-dom';

import CreatePage from '../ContainerWebsiteTag/CreatePage';

// import {getRole} from 'core/utils/auth';
// import {SYS_ADMIN} from 'core/constants/roles';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import DialogConfirm from 'components/common/DialogConfirm';
import {useDeletePage} from 'queries/page';

function PageLayout({
  title,
  children,
  hasPage,
  pageTags = [],
  pageName,
  pageId,
  source,
  isIOS = false,
  isError = false,
  loading = false
}) {
  const navigate = useNavigate();
  const {cid: containerId} = useParams();
  const {mutateAsync: deletePage} = useDeletePage();

  const [isOpenCreatePage, setIsOpenCreatePage] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const currentUserRole = getRole();
  const userIsSysAdmin = true; //currentUserRole === SYS_ADMIN;

  const handleDeletePage = useCallback(async () => {
    setIsLoading(true);
    try {
      await deletePage({pageId});
      setIsLoading(false);
      setOpenConfirm(false);
      ShowToast.success(`Delete ${isIOS ? 'screen' : 'page'} successfully!`, {
        closeOnClick: true
      });
      navigate(`/container/${containerId}`);
    } catch (error) {
      setIsLoading(false);
      ShowToast.error(error, {
        closeOnClick: true
      });
    }
  }, [containerId, deletePage, isIOS, navigate, pageId]);

  return (
    <>
      <Row>
        <Col sm="12">
          <Card className="main-card mb-3">
            <CardHeader>
              {title}
              {userIsSysAdmin ? (
                <div className="btn-actions-pane-right">
                  <Button
                    className="btn-icon"
                    color="success"
                    onClick={() => setIsOpenCreatePage(true)}
                    disabled={isError || loading}
                  >
                    <i className="pe-7s-plus btn-icon-wrapper"> </i>
                    Add {isIOS ? 'screen' : 'page'}
                  </Button>
                  {hasPage ? (
                    <Button
                      className="btn-icon ml-2 btn-icon-only"
                      color="danger"
                      onClick={() => setOpenConfirm(true)}
                    >
                      <i className="pe-7s-trash btn-icon-wrapper"> </i>
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </CardHeader>
            <CardBody>{children}</CardBody>
          </Card>
        </Col>

        <Modal unmountOnClose isOpen={isOpenCreatePage}>
          <CreatePage
            shouldRefetch
            toggle={() => setIsOpenCreatePage(!isOpenCreatePage)}
            pageTags={pageTags}
            source={source}
          />
        </Modal>
      </Row>

      <DialogConfirm
        disableBackdropClick
        disableEscapeKeyDown
        isLoading={isLoading}
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleAgree={handleDeletePage}
      />
    </>
  );
}

export default PageLayout;
