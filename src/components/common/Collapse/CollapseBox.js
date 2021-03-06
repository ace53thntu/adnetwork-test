import './styles.scss';

import PropTypes from 'prop-types';
import * as React from 'react';

import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {CollapseContainer, CollapseLegend} from './Collapse.styles';

function CollapseBox(props) {
  const {children, title, handleClick, open, isError} = props;

  return (
    <CollapseContainer tag="fieldset" className={isError ? 'error' : ''}>
      <CollapseLegend className="col-form-label" onClick={handleClick}>
        <FontAwesomeIcon
          className="mr-1 c-font-12"
          icon={open ? faChevronUp : faChevronDown}
        />
        {title}
      </CollapseLegend>

      {children}
    </CollapseContainer>
  );
}

CollapseBox.propTypes = {
  open: PropTypes.bool,
  isError: PropTypes.bool,
  title: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.node
};
CollapseBox.defaultProps = {
  open: false,
  isError: false,
  handleClick: () => {},
  title: '',
  children: null
};

export default CollapseBox;
