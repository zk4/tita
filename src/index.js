import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import frFR from 'antd/lib/locale-provider/fr_FR';
import 'moment/locale/fr';
import 'antd/dist/antd.css'; 
import {Provider} from 'react-redux'

import './index.css';
// import {autoAddStatEvent} from './redux/stat.redux'
import store from './redux/store'
ReactDOM.render( (
  <Provider store={store}>
<App></App>
</Provider>
), document.getElementById('root'));


 
// store.dispatch(autoAddStatEvent())

