import { combineReducers } from 'redux'
import demoOneReducer from './demoOneReducer.js'
import demoTwoReducer from './demoTwoReducer.js'

export default combineReducers({
  demoOne: demoOneReducer,
  demoTwo: demoTwoReducer,
})
