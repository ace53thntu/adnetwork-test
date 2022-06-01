import React from 'react';
import {ApiError} from 'components/common';
import PropTypes from 'prop-types';
import {useDeleteConcept} from 'queries/concept';
import {GET_CONCEPTS_LOAD_MORE} from 'queries/concept/constants';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {deleteConceptRedux} from 'store/reducers/creative';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {Card, Avatar, Row, Col, Tooltip} from 'antd';
import {DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
const { Meta } = Card;

function ConceptListItemAnt(props) {
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
      ShowToast.error(<ApiError apiError={error}/>);
    }
  };

  return (
    <Col>
      <Card style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <EditOutlined key="edit" />,
          <DeleteOutlined key="delete" />,
        ]}
      >
        <Meta title={
          <Tooltip title={name}>
            <span>{name}</span>
          </Tooltip>}
        />
      </Card>
    </Col>
  );
}

ConceptListItemAnt.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string
  })
};
ConceptListItemAnt.defaultProps = {};

export default ConceptListItemAnt;
