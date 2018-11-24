import {combineReducers} from 'redux'
import {stat} from './stat.redux'
import {refresh} from './refresh.redux'
import {windowEvent} from './windowEvent.redux'

const reducers={
    stat,
    refresh,
    windowEvent
}
export  default combineReducers(reducers)
