import React from 'react'
import ReactDOM from 'react-dom'
import App from './Container/App'
import store from './store'
import 'antd/dist/antd.css';
ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);
