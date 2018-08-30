import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import AppReducer from './AppReducer'
import ContactsListReducer from './ContactsListReducer'
import ChatListReducer from './ChatListReducer'
import ListChatsReducer from './ListChatsReducer'

export default combineReducers({
  AuthReducer,
  AppReducer,
  ContactsListReducer,
  ChatListReducer,
  ListChatsReducer
})
