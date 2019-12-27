import React, { useEffect, createContext } from "react"
import { observer, useLocalStore } from "mobx-react-lite"
import { Route, Switch, HashRouter } from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline'
import ConsumerWrapper from './components/ConsumerWrapper'
import Login from './containers/login'
import Cookies from "js-cookie"
import SnackBar from './components/SnackBar'

export const RouterContext = createContext()

const SnackBarWrapped = ConsumerWrapper(SnackBar)

const Router = observer(props => {
  const globalStore = useLocalStore(
    source => ({
      loginData: null,
      snackBar: null
    }),
    props
  )

  useEffect(() => {
    const loginData = JSON.parse(Cookies.get("loginData") || '{}')
    globalStore.loginData = loginData
  }, [])

  return <RouterContext.Provider value={globalStore}>
    <CssBaseline />
    <SnackBarWrapped />
    <HashRouter>
      <Switch>
        <Route path="/" exact component={ConsumerWrapper(Login)} />
        <Route path="/login" component={ConsumerWrapper(Login)} />
      </Switch>
    </HashRouter>
  </RouterContext.Provider>
})

export default Router
