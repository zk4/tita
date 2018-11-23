import {combineReducers} from 'redux'
import {stat} from './stat.redux'
import {refresh} from './refresh.redux'

const reducers={
    stat,
    refresh
}
export  default combineReducers(reducers)
