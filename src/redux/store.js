import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import reducers  from './reducers'

const reduxDevTools=window.devToolsExtension?window.devToolsExtension():f=>f
let store=createStore(reducers,compose(applyMiddleware(thunk),reduxDevTools))
export default  store;
 