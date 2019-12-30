import React, { useEffect, createContext } from "react"
import { observer, useLocalStore } from "mobx-react-lite"
import { Route, Switch, HashRouter } from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline'
import ConsumerWrapper from './components/ConsumerWrapper'
import Login from './containers/login'
import Cookies from "js-cookie"
import SnackBar from './components/SnackBar'
import Playground from './containers/playground'
import { toJS } from 'mobx'

export const RouterContext = createContext()

const SnackBarWrapped = ConsumerWrapper(SnackBar)
const LoginWrapped = ConsumerWrapper(Login)

const Router = observer(props => {
  const globalStore = useLocalStore(
    () => ({
      userInfo: null,
      snackBar: null
    })
  )

  useEffect(() => {
    const userInfo = JSON.parse(Cookies.get("userInfo") || '{}')
    globalStore.userInfo = userInfo
  }, [])

  return <RouterContext.Provider value={globalStore}>
    <CssBaseline />
    <SnackBarWrapped />
    <HashRouter>
      <Switch>
        <Route path="/" exact component={LoginWrapped} />
        <Route path="/login" component={LoginWrapped} />
        <Route path="/playground" component={ConsumerWrapper(Playground)} />
      </Switch>
    </HashRouter>
  </RouterContext.Provider>
})

export default Router