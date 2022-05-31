import { Breadcrumb } from 'antd';
import {useBreadCrumb} from "../../hooks/useBreadCrumb";
import {Link} from 'react-router-dom';
import {setSelectedTreeNodeRedux} from "../../../../store/reducers/campaign";
import {useDispatch} from "react-redux";

const BreadCrumbCampaign = ({ defaultTitle }) => {
  const breadCrumb = useBreadCrumb();
  const dispatch = useDispatch();

  const handleBreadCrumbItemClick = (uuid) => {
    //set selected tree node
    dispatch(setSelectedTreeNodeRedux(uuid));
  }

  return breadCrumb && breadCrumb.length >0 ? (
    <Breadcrumb>
      {breadCrumb.map(
          item => <Breadcrumb.Item onClick={() => handleBreadCrumbItemClick(item?.uuid)}>
            <Link to={item.url}>
              {item.name}
            </Link>
          </Breadcrumb.Item>
        )
      }
    </Breadcrumb>
  ) : defaultTitle;
};

export default BreadCrumbCampaign;
