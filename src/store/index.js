import {createStore} from 'redux'
import todoReducer from './reducers/index'

export let store = createStore(todoReducer)