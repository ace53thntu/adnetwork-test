import * as React from 'react';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import AiActivTreeSelect from "../../../../components/AiActivTreeSelect";
import {RoutePaths} from "../../../../constants/route-paths";
import {setSelectedTreeNodeRedux, useCommonSelector} from "../../../../store/reducers/common";
import {getAllConceptTreeData} from "../../utils";
import {selectAdvertiserRedux, selectConceptRedux} from "../../../../store/reducers/creative";
import {useParams} from "react-router-dom";


function TreeSelectCreative() {
  const { selectedTreeNode } = useCommonSelector();
  const { advertiserId, conceptId } = useParams();
  const [treeData, setTreeData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getConceptTree();
  }, [])

  const getConceptTree = async () => {
    const treeData = await getAllConceptTreeData();

    // set default selected item
    if(conceptId){
      dispatch(setSelectedTreeNodeRedux(conceptId))
    } else if(advertiserId) {
      dispatch(setSelectedTreeNodeRedux(advertiserId))
    } else {
      // navigate to first advertiser uuid
      navigate(`/${RoutePaths.CREATIVE}/${treeData[0].uuid}`);
    }

    setTreeData(treeData);
  }

  const handleSelectedItem = React.useCallback((value, node) => {
    const { isAdvertiser, isConcept, uuid, advertiser_uuid } = node || {};

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
  }, []);

  return (
    <div className="mb-3">
      <AiActivTreeSelect selectedItem={selectedTreeNode} treeData={treeData} onSelectedItem={handleSelectedItem} />
    </div>
  );
}
export default TreeSelectCreative;
