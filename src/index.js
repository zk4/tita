import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import frFR from 'antd/lib/locale-provider/fr_FR';
import 'moment/locale/fr';
import 'antd/dist/antd.css'; 
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import reducers  from './redux/reducers'
import './index.css';
import {autoAddStatEvent} from './redux/stat.redux'
const reduxDevTools=window.devToolsExtension?window.devToolsExtension():f=>f
const store=createStore(reducers,compose(applyMiddleware(thunk),reduxDevTools))
 
ReactDOM.render( (
  <Provider store={store}>
<App store={store}></App>
</Provider>
), document.getElementById('root'));


 
store.dispatch(autoAddStatEvent())