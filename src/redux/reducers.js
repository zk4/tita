import {combineReducers} from 'redux'
import {stat} from './stat.redux'
import {refresh} from './refresh.redux'
import {windowEvent} from './windowEvent.redux'
import {mouse} from './mouse.redux'

const reducers={
    stat,
    refresh,
    windowEvent,
    mouse
}
export  default combineReducers(reducers)
