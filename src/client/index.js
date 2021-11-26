import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import customRoutesConfig from '@/router'
import rootReducer from '@/reducers'
import 'antd/dist/antd.less'

const state =
  window._PRELOADED_STATE instanceof Object
    ? window._PRELOADED_STATE
    : JSON.parse(window._PRELOADED_STATE)
const store = createStore(rootReducer, state, applyMiddleware(thunk))

if (window._RENDER_ENV === 'client') {
  console.log('我是客户端渲染')
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <div id="main">{renderRoutes(customRoutesConfig)}</div>
      </BrowserRouter>
    </Provider>,
    document.querySelector('#app')
  )
} else {
  console.log('我是服务端渲染')
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <div id="main">{renderRoutes(customRoutesConfig)}</div>
      </BrowserRouter>
    </Provider>,
    document.querySelector('#app')
  )
}
