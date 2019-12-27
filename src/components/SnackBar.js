import classnames from 'classnames';
import React, { useEffect } from 'react';
import { observer, useLocalStore } from "mobx-react-lite";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default observer(function MySnackbarContentWrapper(props) {
  const store = useLocalStore(
    source => ({
      show: false,
      messageQueue: [],
      showMessage(config) {
        store.messageQueue.push({
          config,
          key: new Date().getTime()
        })
        if (store.show) {
          // immediately begin dismissing current message
          // to start showing new one
          store.show = false
        } else {
          store.processQueue()
        }
      },
      onClose(event, reason) {
        if (reason === 'clickaway') {
          return
        }
        store.show = false
      },
      handleExited() {
        store.processQueue()
      },
      messageInfo: null,
      processQueue() {
        if (store.messageQueue.length > 0) {
          store.messageInfo = store.messageQueue.shift()
          store.show = true
        }
      }
    }),
    props
  )

  useEffect(() => {
    props.globalStore.snackBarStore = store
    window.snackBarStore = store
  }, [])

  const classes = useStyles1();
  const { show, onClose, messageInfo, handleExited } = store

  const iconType = messageInfo ? messageInfo.config.type : 'success'
  const Icon = variantIcon[iconType]

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={show}
      autoHideDuration={2000}
      onClose={onClose}
      onExited={handleExited}
    >
      <SnackbarContent
        className={classnames(classes[iconType])}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classnames(classes.icon, classes.iconVariant)} />
            {messageInfo ? messageInfo.config.message : undefined}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
})
