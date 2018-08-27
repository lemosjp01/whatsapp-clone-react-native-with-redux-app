import { USER_CONTACT_LIST } from '../actions/Types'

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_CONTACT_LIST:
      return action.payload
   /* case :
      return { ...state,  }
    case :
      return { ...state,  } */
    default:
      return state
  }
}
