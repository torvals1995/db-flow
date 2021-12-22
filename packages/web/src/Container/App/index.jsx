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
export default function App({ store }) {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" children={() => <Home />} exact/>
            <Route path="/nginx" children={() => <Nginx />} exact/>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  )
}
