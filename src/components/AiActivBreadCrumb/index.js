import './index.scss';

import {Breadcrumb} from 'antd';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import {setSelectedTreeNodeRedux} from '../../store/reducers/common';
import {useBreadCrumb} from './hooks/useBreadCrumb';

const AiActivBreadCrumb = ({defaultTitle}) => {
  const breadCrumb = useBreadCrumb();
  const dispatch = useDispatch();

  const handleBreadCrumbItemClick = uuid => {
    //set selected tree node
    dispatch(setSelectedTreeNodeRedux(uuid));
  };

  return breadCrumb && breadCrumb.length > 0 ? (
    <Breadcrumb>
      {breadCrumb.map(item => (
        <Breadcrumb.Item
          className="breadcrumb-item"
          key={item?.uuid}
          onClick={() => handleBreadCrumbItemClick(item?.uuid)}
        >
          <Link to={item.url}>
            <span>{item.name}</span>
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  ) : (
    defaultTitle
  );
};

export default AiActivBreadCrumb;
