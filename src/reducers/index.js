import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import AppReducer from './AppReducer'
import ContactsListReducer from './ContactsListReducer'

export default combineReducers({
  AuthReducer,
  AppReducer,
  ContactsListReducer
})
