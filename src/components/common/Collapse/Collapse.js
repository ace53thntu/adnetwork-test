import PropTypes from 'prop-types';
import * as React from 'react';
import {Col, Row} from 'reactstrap';

import MuiCollapse from '@material-ui/core/Collapse';

import CollapseBox from './CollapseBox';

function Collapse(props) {
  const {title, children, unMount, initialOpen, isError} = props;

  const [open, setOpen] = React.useState(initialOpen);

  React.useEffect(() => {
    if (isError) {
      setOpen(true);
    }
  }, [isError]);

  function handleCollapse(event) {
    event?.preventDefault();
    setOpen(prevState => !prevState);
  }

  return (
    <CollapseBox
      title={title}
      open={open}
      handleClick={handleCollapse}
      isError={isError}
    >
      <MuiCollapse in={open}>
        {unMount ? (
          open && (
            <Row>
              <Col sm={12}>
                {React.Children.map(children, child => {
                  return React.cloneElement(child, {
                    toggleCollapse: handleCollapse
                  });
                })}
              </Col>
            </Row>
          )
        ) : (
          <Row>
            <Col sm={12}>
              {React.Children.map(children, child => {
                return React.cloneElement(child, {
                  toggleCollapse: handleCollapse
                });
              })}
            </Col>
          </Row>
        )}
      </MuiCollapse>
    </CollapseBox>
  );
}

Collapse.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  unMount: PropTypes.bool,
  initialOpen: PropTypes.bool,
  isError: PropTypes.bool
};
Collapse.defaultProps = {
  unMount: true,
  initialOpen: false,
  isError: false
};

export default Collapse;
