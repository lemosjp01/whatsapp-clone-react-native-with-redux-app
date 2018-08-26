import { CHANGE_EMAIL_ADD_CONTACT, ADD_CONTACT_ERROR } from '../actions/Types'

const INITIAL_STATE = {
  add_email_contact: '',
  txt_register_result_error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_EMAIL_ADD_CONTACT:
      return { ...state, add_email_contact: action.payload }
    case ADD_CONTACT_ERROR:
      return { ...state, txt_register_result_error: action.payload }
    default:
      return state
  }
}
