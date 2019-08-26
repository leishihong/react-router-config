import React, { Fragment } from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Loadable from 'react-loadable'
import { BackTop, LocaleProvider } from 'antd'
import zh from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import { store, persistor } from '@/store/index'

import { PersistGate } from 'redux-persist/integration/react' //不加这个切换中文时，日期组件年是中文，月是英文。。。。
import App from '@/App'
import { BaseLoading } from './components/common/index'
import history from './lib/history'
import cookies from 'js-cookie'

if (module.hot) {
  module.hot.accept()
}

const loading = () => <BaseLoading />

const Login = Loadable({
  loading,
  loader: () => import('./views/login')
})

const RootLayout = Loadable({
  loading,
  loader: () => import('./layout')
})

const NotFound = Loadable({
  loading,
  loader: () => import('./views/NotFound')
})

const isLogin = cookies.get('tokenUid')
/**
 * forceRefresh: bool
 * 作用：当浏览器不支持 HTML5 的 history API 时强制刷新页面。
 */
const supportsHistory = 'pushState' in window.history
/**
 * getUserConfirmation: func
 * 作用：导航到此页面前执行的函数，默认使用 window.confirm
 * 使用场景：当需要用户进入页面前执行什么操作时可用，不过一般用到的不多。
 */
const getConfirmation = (message, callback) => {
  if (!isLogin) {
    message.push('/login')
  } else {
    message.push(message.location.pathname)
  }
  //   if (message.location.pathname === '/') {
  //     message.push('/dashboard')
  //   } else {
  //     message.push(message.location.pathname)
  //   }
}
const renderOut = () => {
  render(
    // Provider挂载redux
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <LocaleProvider locale={ zh }>
          <Fragment>
            <Router
              history={ history }
              basename="/"
              getUserConfirmation={ getConfirmation(history, 'yourCallBack') }
              forceRefresh={ !supportsHistory }
            >
              <App isLogin={ isLogin ? true : false }>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={ () => <Redirect to="/layout/dashboard" push /> }
                  />
                  <Route path="/login" component={ Login } />
                  <Route path="/layout" component={ RootLayout } />
                  <Route component={ NotFound } />
                  {/* <Route
                    path="*"
                    render={() => (
                      <Redirect to="/notFound" component={NotFound}></Redirect>
                    )}
                  /> */}
                </Switch>
              </App>
            </Router>
            {/* // <RootApp /> */}
            <BackTop visibilityHeight={ 500 } />
          </Fragment>
        </LocaleProvider>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  )
}
renderOut()

store.subscribe(renderOut)

serviceWorker.unregister()
