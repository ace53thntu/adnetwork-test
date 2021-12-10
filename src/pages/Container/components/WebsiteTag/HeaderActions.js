// import PropTypes from 'prop-types';
import {
  deletePageRedux,
  toggleCreatePageModalRedux
} from 'store/reducers/container';
import {useDeletePage} from 'queries/page';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import {Button} from 'reactstrap';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {DialogConfirm} from 'components/common';

function HeaderActions(props) {
  const {source, cid: containerId, pageId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {mutateAsync: deletePageRequest} = useDeletePage();

  const [isLoading, setIsLoading] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const handleDeletePage = async () => {
    setIsLoading(true);
    try {
      await deletePageRequest({pageId});
      setIsLoading(false);
      setOpenConfirm(false);
      ShowToast.success(
        `Delete ${source === 'web' ? 'page' : 'screen'} successfully!`
      );
      dispatch(deletePageRedux());
      navigate(`/container/${containerId}`);
    } catch (error) {
      setIsLoading(false);
      ShowToast.error(error?.message);
    }
  };

  const handleToggleCreatePageModal = () => {
    dispatch(toggleCreatePageModalRedux());
  };

  return (
    <>
      <div className="btn-actions-pane-right">
        <Button
          className="btn-icon"
          color="success"
          onClick={handleToggleCreatePageModal}
          // disabled={isError || loading}
        >
          <i className="pe-7s-plus btn-icon-wrapper"> </i>
          Add {source === 'web' ? 'page' : 'screen'}
        </Button>
        <Button
          className="btn-icon ml-2 btn-icon-only"
          color="danger"
          onClick={() => setOpenConfirm(true)}
        >
          <i className="pe-7s-trash btn-icon-wrapper"> </i>
        </Button>
      </div>
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

HeaderActions.propTypes = {};
HeaderActions.defaultProps = {};

export default HeaderActions;
