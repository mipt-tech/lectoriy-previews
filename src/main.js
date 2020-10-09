import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import waitUntilFontLoaded from './util/waitForFont'

waitUntilFontLoaded().then(() => {
  ReactDOM.render(React.createElement(App), document.querySelector('#mount'))
})
