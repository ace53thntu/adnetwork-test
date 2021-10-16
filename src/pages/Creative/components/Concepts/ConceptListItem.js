import {DialogConfirm} from 'components/common';
import PropTypes from 'prop-types';
import {useDeleteConcept} from 'queries/concept';
import {GET_CONCEPTS_LOAD_MORE} from 'queries/concept/constants';
import * as React from 'react';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {deleteConceptRedux} from 'store/reducers/creative';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
  ConceptListItemAction,
  ConceptListItemBody,
  ConceptListItemContainer,
  ConceptListItemName
} from './ConceptListItem.styles';

function ConceptListItem(props) {
  const {data} = props;
  const {name, id: conceptId} = data;
  const {advertiserId} = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {mutateAsync: deleteConceptRequest} = useDeleteConcept();

  const [isOpen, setIsOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickActionIcon = event => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickConceptItem = event => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`${conceptId}`);
  };

  const handleDelete = () => {
    handleClose();
    setIsOpen(true);
  };

  const handleAgree = async () => {
    setIsOpen(false);
    try {
      await deleteConceptRequest(conceptId);
      queryClient.invalidateQueries([GET_CONCEPTS_LOAD_MORE]);
      ShowToast.success('Delete Concept successfully!');
      dispatch(deleteConceptRedux(conceptId, advertiserId));
    } catch (error) {
      ShowToast.error(error?.msg);
    }
  };

  return (
    <>
      <ConceptListItemContainer>
        <ConceptListItemBody onClick={handleClickConceptItem}>
          <ConceptListItemAction>
            <IconButton
              onClick={handleClickActionIcon}
              color={'inherit'}
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ConceptListItemAction>

          {/* <div>image</div> */}
        </ConceptListItemBody>

        <ConceptListItemName>
          <Tooltip title={name}>
            <div>{name}</div>
          </Tooltip>
        </ConceptListItemName>
      </ConceptListItemContainer>
      <Menu
        id={`concept-item-menu-${conceptId}`}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem component={NavLink} to={`${conceptId}`}>
          <ListItemIcon>
            <EditIcon className="text-info" fontSize="small" />
          </ListItemIcon>
          <Typography className="text-info" variant="inherit">
            Edit
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon className="text-danger" fontSize="small" />
          </ListItemIcon>
          <Typography className="text-danger" variant="inherit">
            Delete
          </Typography>
        </MenuItem>
      </Menu>

      <DialogConfirm
        open={isOpen}
        title="Are you sure to delete this concept?"
        handleAgree={handleAgree}
        handleClose={() => setIsOpen(false)}
      />
    </>
  );
}

ConceptListItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string
  })
};
ConceptListItem.defaultProps = {};

export default ConceptListItem;
