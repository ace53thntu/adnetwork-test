import React from 'react';
import {useNavigate} from 'react-router-dom';
import {
  UncontrolledButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

export default function TableActions({
  editRoute = '',
  onDelete = () => {},
  showEdit = true,
  showDelete = true,
}) {
  const navigate = useNavigate();
  return (
    <div className="d-block w-100 text-center">
      <UncontrolledButtonDropdown>
        <DropdownToggle
          caret
          className="btn-icon btn-icon-only btn btn-link"
          color="link"
        >
          <i className="lnr-menu-circle btn-icon-wrapper" />
        </DropdownToggle>
        <DropdownMenu className="rm-pointers dropdown-menu-hover-link">
          {showEdit ? (
            <DropdownItem onClick={() => navigate(editRoute)}>
              <i className="dropdown-icon lnr-inbox"></i>
              <span>Edit</span>
            </DropdownItem>
          ) : null}
          {showDelete ? (
            <DropdownItem onClick={onDelete}>
              <i className="dropdown-icon lnr-file-empty"></i>
              <span>Delete</span>
            </DropdownItem>
          ) : null}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  );
}
