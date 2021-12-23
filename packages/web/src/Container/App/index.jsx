import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  // Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from '../Home'
import Nginx from '../Nginx';
import CreateProj from '../CreateProj';
import Head from '../Common/Head';
export default function App({ store }) {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Head />
          <Switch>
            <Route path="/" children={() => <Home />} exact />
            <Route path="/nginx" children={() => <Nginx />} exact />
            <Route path="/createProj" children={() => <CreateProj />} exact />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  )
}
