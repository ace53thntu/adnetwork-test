import './index.scss';

import { TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
// import {useDispatch} from 'react-redux';

// import {setSelectTreeDataRedux} from '../../store/reducers/common';

const AiActivTreeSelect = React.memo(
  ({ selectedItem, treeData, onSelectedItem, ...rest }) => {
    // const dispatch = useDispatch();
    const [treeDataFiltered, setTreeDataFiltered] = useState(treeData);
    useEffect(() => {
      if (treeData) {
        setTreeDataFiltered(treeData);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeData]);

    const loopNode = (searchValue, data) => {
      return data.map(item => {
        const index = item.title
          ?.toLowerCase()
          .indexOf(searchValue.toLowerCase());
        const beforeStr = item.title?.substr(0, index);
        const afterStr = item.title?.substr(index + searchValue.length);
        const matchedItemValue = item.title?.substr(index, searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#545cd8', fontWeight: 'bold' }}>
                {matchedItemValue}
              </span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return {
            ...item,
            title,
            tempTitle: item.title,
            children: loopNode(searchValue, item.children)
          };
        }
        return {
          ...item,
          title,
          tempTitle: item.title
        };
      });
    };

    const handleSearch = value => {
      const filteredData = loopNode(value, treeData);
      setTreeDataFiltered(filteredData);
    };

    return (
      <TreeSelect
        treeLine
        showSearch
        className="mr-3"
        style={{
          width: '350px'
        }}
        value={treeData ? selectedItem : null}
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto'
        }}
        treeData={treeDataFiltered}
        placeholder="Please select..."
        onSelect={onSelectedItem}
        filterTreeNode={(inputValue, treeNode) => {
          const { tempTitle } = treeNode;
          return (
            tempTitle &&
            tempTitle.toLowerCase().includes(inputValue.toLowerCase())
          );
        }}
        onSearch={handleSearch}
        onChange={() => setTreeDataFiltered(treeData)}
        {...rest}
      />
    );
  }
);

export default AiActivTreeSelect;
