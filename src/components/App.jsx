import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { StylesProvider } from '@material-ui/core/styles'
import store from './../store'
import Control from './Control/Control'
import Preview from './Preview/Preview'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import eventBus from '../util/eventBus'

import styles from './App.css'

class App extends React.Component {
  state = {
    notificationOpen: false,
    notificationMessage: '',
    notificationSeverity: 'info',
  }

  componentDidMount() {
    eventBus.on('show-notification', data => {
      this.setState({
        notificationOpen: true,
        notificationMessage: data.message,
        notificationSeverity: data.severity,
      })
    })
  }

  handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ notificationOpen: false })
  }

  render() {
    const { notificationOpen, notificationMessage, notificationSeverity } = this.state

    return (
      <Provider store={store}>
        <StylesProvider injectFirst>
          <div className={styles.container}>
            <Preview />
            <Control />
          </div>
          <Snackbar
            open={notificationOpen}
            autoHideDuration={7000}
            onClose={this.handleNotificationClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={this.handleNotificationClose}
              severity={notificationSeverity}
              variant="filled"
            >
              {notificationMessage}
            </Alert>
          </Snackbar>
        </StylesProvider>
      </Provider>
    )
  }
}

export default hot(module)(App)
