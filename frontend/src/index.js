import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import DispatcherService from './service/DispatcherService';
import './i18n/i18n';

axios.defaults.baseURL = process.env.REACT_APP_API_UR;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
DispatcherService.interceptResponse();

ReactDOM.render(
   <React.StrictMode>
    <App />,
   </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
