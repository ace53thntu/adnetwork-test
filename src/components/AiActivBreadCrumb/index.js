import {Breadcrumb, Spin} from 'antd';
import {useBreadCrumb} from "./hooks/useBreadCrumb";
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setSelectedTreeNodeRedux, useCommonSelector} from "../../store/reducers/common";

const AiActivBreadCrumb = ({defaultTitle}) => {
  const { selectedTreeNode } = useCommonSelector();
  const breadCrumb = useBreadCrumb();
  const dispatch = useDispatch();

  const handleBreadCrumbItemClick = (uuid) => {
    //set selected tree node
    dispatch(setSelectedTreeNodeRedux(uuid));
  }

  return breadCrumb && breadCrumb.length > 0 ? (
    <Breadcrumb>
      {breadCrumb.map(
          item => <Breadcrumb.Item key={item?.uuid} onClick={() => handleBreadCrumbItemClick(item?.uuid)}>
            <Link to={item.url}>
              {item.name}
            </Link>
          </Breadcrumb.Item>
        )
      }
    </Breadcrumb>
  ) : defaultTitle;
};

export default AiActivBreadCrumb;
