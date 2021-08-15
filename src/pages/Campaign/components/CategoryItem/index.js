import React, {Fragment} from 'react';
import {ListGroupItem, CustomInput, Button} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {faTrashAlt, faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const CategoryItem = ({categoryName, categoryId}) => {
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate(`./${categoryId}`);
  };
  return (
    <Fragment>
      <ListGroupItem>
        <div className="todo-indicator bg-success" />
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left mr-2">
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox3"
                label="&nbsp;"
              />
            </div>
            <div className="widget-content-left flex2">
              <div className="widget-heading">{categoryName}</div>
              <div className="widget-subheading">Category Path</div>
            </div>
            <div className="widget-content-right widget-content-actions">
              <Button
                onClick={goToDetail}
                color="primary"
                outline
                className="btn-pill"
              >
                Go to details
              </Button>
            </div>
            <div className="widget-content-right">
              <div className="badge badge-warning mr-2">69</div>
            </div>
            <div className="widget-content-right">
              <Button
                className="border-0 btn-transition"
                outline
                color="success"
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
              <Button
                className="border-0 btn-transition"
                outline
                color="danger"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </div>
          </div>
        </div>
      </ListGroupItem>
    </Fragment>
  );
};

export default CategoryItem;
