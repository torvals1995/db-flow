import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  // Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Alert } from 'antd';
// import { TextLoop } from 'react-text-loop-next';
import Home from '../Home'
import Nginx from '../Nginx';
import CreateProj from '../CreateProj';
import Head from '../Common/Head';
import Deploy from '../Deploy';
export default function App({ store }) {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Head />
          {/* <Alert
            banner
            message={
              <TextLoop mask>
                <div>Notice message one</div>
                <div>Notice message two</div>
                <div>Notice message three</div>
                <div>Notice message four</div>
              </TextLoop>
            }
          /> */}
          <Switch>
            <Route path="/" children={() => <Home />} exact />
            <Route path="/nginx" children={() => <Nginx />} exact />
            <Route path="/createProj" children={() => <CreateProj />} exact />
            <Route path="/deploy/:id" children={() => <Deploy />} exact />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  )
}
