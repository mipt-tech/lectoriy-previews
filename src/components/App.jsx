import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { StylesProvider } from '@material-ui/core/styles'
import store from './../store'
import Control from './Control/Control'
import Preview from './Preview/Preview'

import styles from './App.css'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StylesProvider injectFirst>
          <div className={styles.container}>
            <Preview />
            <Control />
          </div>
        </StylesProvider>
      </Provider>
    )
  }
}

export default hot(module)(App)
