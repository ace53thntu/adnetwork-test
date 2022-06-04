import * as React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {useParams} from 'react-router-dom';

import AiActivTreeSelect from '../../../../components/AiActivTreeSelect';
import {RoutePaths} from '../../../../constants/route-paths';
import {
  setSelectedTreeNodeRedux,
  useCommonSelector
} from '../../../../store/reducers/common';
import {
  selectAdvertiserRedux,
  selectConceptRedux
} from '../../../../store/reducers/creative';
import {getAllConceptTreeData} from '../../utils';

function TreeSelectCreative() {
  const {selectedTreeNode} = useCommonSelector();
  const {advertiserId, conceptId} = useParams();
  const [treeData, setTreeData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getConceptTree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getConceptTree = async () => {
    const treeData = await getAllConceptTreeData();

    // set default selected item
    if (conceptId) {
      dispatch(setSelectedTreeNodeRedux(conceptId));
    } else if (advertiserId) {
      dispatch(setSelectedTreeNodeRedux(advertiserId));
    } else {
      dispatch(setSelectedTreeNodeRedux(''));
    }

    setTreeData(treeData);
  };

  const handleSelectedItem = React.useCallback((value, node) => {
    const {isAdvertiser, isConcept, uuid, advertiser_uuid} = node || {};

    //set selected tree node
    dispatch(setSelectedTreeNodeRedux(value));

    if (isAdvertiser) {
      dispatch(selectAdvertiserRedux(uuid));
      navigate(`/${RoutePaths.CREATIVE}/${uuid}`);
    }

    if (isConcept) {
      dispatch(selectConceptRedux(uuid, advertiser_uuid));
      navigate(`/${RoutePaths.CREATIVE}/${advertiser_uuid}/${uuid}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClearCreative = value => {
    if (!value) {
      dispatch(setSelectedTreeNodeRedux(''));
      navigate(`/${RoutePaths.CREATIVE}`);
    }
  };

  return (
    <div style={{marginLeft: '15px'}} className="mb-3">
      <AiActivTreeSelect
        allowClear
        selectedItem={selectedTreeNode}
        treeData={treeData}
        onSelectedItem={handleSelectedItem}
        onChange={handleClearCreative}
      />
    </div>
  );
}
export default TreeSelectCreative;
