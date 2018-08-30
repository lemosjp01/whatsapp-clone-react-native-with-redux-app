import { CHANGE_MAIL, CHANGE_NAME, CHANGE_PASSWORD, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR, LOGIN_IN_PROCESS, USER_LOGIN_ERROR, REGISTER_IN_PROCESS, USER_LOGIN_SUCESS } from '../actions/Types'

const INITIAL_STATE = {
  nome: '',
  email: '',
  senha: '',
  registerError: '',
  loginError: '',
  loading_login: false,
  loading_register: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return { ...state, nome: action.payload }
    case CHANGE_MAIL:
      return { ...state, email: action.payload }
    case CHANGE_PASSWORD:
      return { ...state, senha: action.payload }
    case USER_REGISTER_ERROR:
      return { ...state, registerError: action.payload, loading_register: false }
    case USER_REGISTER_SUCCESS:
      return { ...state, nome: '', senha: '', loading_register: false }
    case USER_LOGIN_ERROR:
      return { ...state, loginError: action.payload, loading_login: false }
    case USER_LOGIN_SUCESS:
      return { ...state, ...INITIAL_STATE }
    case LOGIN_IN_PROCESS:
      return { ...state, loading_login: true }
    case REGISTER_IN_PROCESS:
      return { ...state, loading_register: true }
    default:
      return state
  }
}
