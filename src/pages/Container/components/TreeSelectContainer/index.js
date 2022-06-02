import * as React from 'react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { setSelectedTreeNodeRedux, useCommonSelector } from "../../../../store/reducers/common";
import { RoutePaths } from "../../../../constants/route-paths";
import AiActivTreeSelect from "../../../../components/AiActivTreeSelect";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import {
  setFlagAlready,
  toggleCreateContainerModalRedux
} from "../../../../store/reducers/container";
import { getAllContainerTreeData } from "../../utils";

function TreeSelectContainer() {
  const { t } = useTranslation();
  const { selectedTreeNode } = useCommonSelector();
  const [treeData, setTreeData] = useState();
  const { cid, pageId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getContainerTree();
  }, [])

  const getContainerTree = async () => {
    const treeData = await getAllContainerTreeData();

    if (pageId) {
      dispatch(setSelectedTreeNodeRedux(pageId))
    } else if (cid) {
      dispatch(setSelectedTreeNodeRedux(cid))
    } else {
      dispatch(setSelectedTreeNodeRedux(''))
    }

    setTreeData(treeData);
  }

  const handleSelectedItem = React.useCallback((value, node) => {
    const { isContainer, container_uuid, isPage, uuid, source } = node || {};

    dispatch(setSelectedTreeNodeRedux(value));

    if (isContainer) {
      navigate(`/${RoutePaths.CONTAINER}/${uuid}`);
    }

    if (isPage) {
      dispatch(setFlagAlready(false));
      navigate(`/${RoutePaths.CONTAINER}/${container_uuid}/${source}/${uuid}`);
    }
  }, []);

  const onHandleOpenCreateDialog = () => {
    dispatch(toggleCreateContainerModalRedux());
  };

  const handleClearContainer = (value) => {
    if (!value) {
      dispatch(setSelectedTreeNodeRedux(''))
      navigate(`/${RoutePaths.CONTAINER}`);
    }
  }

  return (
    <div style={{ paddingLeft: "15px" }} className="mb-3">
      <AiActivTreeSelect
        allowClear
        selectedItem={selectedTreeNode}
        treeData={treeData}
        onSelectedItem={handleSelectedItem}
        onChange={handleClearContainer}
      />

      <Button type="primary" onClick={onHandleOpenCreateDialog}>{t('createNew')}</Button>
    </div>
  );
}
export default TreeSelectContainer;
