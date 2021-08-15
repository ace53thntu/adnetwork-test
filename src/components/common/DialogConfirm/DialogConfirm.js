import React from 'react';
import {useTranslation} from 'react-i18next';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function DialogConfirm({
  open = false,
  handleClose = () => {},
  handleAgree = () => {},
  title = 'Are you sure?',
  isLoading = false,
  ...rest
}) {
  const {t} = useTranslation();
  const classes = useStyles();
  return (
    <Dialog
      {...rest}
      fullWidth
      maxWidth={'xs'}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle disableTypography>
        <Typography variant="h3" gutterBottom align="center">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.content}>
        {isLoading ? <CircularProgress /> : null}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          autoFocus
          disabled={isLoading}
        >
          {t('cancel')}
        </Button>
        <Button onClick={handleAgree} color="primary" disabled={isLoading}>
          {t('agree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
