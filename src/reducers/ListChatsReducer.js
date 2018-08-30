import { LIST_CHATS_USER } from '../actions/Types'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_CHATS_USER:
      return action.payload
    default:
      return state
  }
}
