import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import AppReducer from './AppReducer'
import ContactsListReducer from './ContactsListReducer'
import ChatListReducer from './ChatListReducer'

export default combineReducers({
  AuthReducer,
  AppReducer,
  ContactsListReducer,
  ChatListReducer
})
