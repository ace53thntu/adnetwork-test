import React from 'react';
import {withStyles} from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PostAddIcon from '@material-ui/icons/PostAdd';
import {Button} from 'reactstrap';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {}
}))(MenuItem);

export default function CappingActionHeader({handleClickAdd}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mb-2">
      <Button color="success" onClick={handleClick}>
        Add new
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {[
          {title: 'Capping', icon: <PlaylistAddIcon fontSize="small" />},
          {title: 'Weekpart', icon: <PostAddIcon fontSize="small" />}
        ].map((item, idx) => {
          return (
            <StyledMenuItem
              key={`pr-${idx}`}
              onClick={() => {
                handleClickAdd(idx);
                handleClose();
              }}
            >
              <ListItemIcon>{item?.icon}</ListItemIcon>
              <ListItemText primary={item?.title} />
            </StyledMenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
}
