import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import b64 from 'base-64'
import { CHANGE_MAIL, CHANGE_NAME, CHANGE_PASSWORD, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR, USER_LOGIN_SUCESS, USER_LOGIN_ERROR, LOGIN_IN_PROCESS, REGISTER_IN_PROCESS } from './Types'

export const changeMail = (texto) => {
  return {
    type: CHANGE_MAIL,
    payload: texto
  }
}

export const changePassword = (texto) => {
  return {
    type: CHANGE_PASSWORD,
    payload: texto
  }
}

export const changeName = (texto) => {
  return {
    type: CHANGE_NAME,
    payload: texto
  }
}

export const userRegister = ({ nome, email, senha }) => {
  return dispatch => {
    dispatch({ type: REGISTER_IN_PROCESS })
    firebase.auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(user => {
              let emailB64 = b64.encode(email)

              firebase.database().ref(`/contatos/${emailB64}`)
                    .push({ nome })
                    .then(value => userRegisterSucess(dispatch))
            })
            .catch(erro => userRegisterError(erro, dispatch))
  }
}

const userRegisterSucess = (dispatch) => {
  dispatch({ type: USER_REGISTER_SUCCESS })

  Actions.welcome()
}

const userRegisterError = (erro, dispatch) => {
  dispatch({ type: USER_REGISTER_ERROR, payload: erro.mensagem })
}

export const authUser = ({ email, senha }) => {
  return dispatch => {
    dispatch({ type: LOGIN_IN_PROCESS })
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(value => userLoginSucess(dispatch))
      .catch(erro => userLoginError(erro, dispatch))
  }
}

const userLoginSucess = (dispatch) => {
  dispatch(
    {
      type: USER_LOGIN_SUCESS
    }
  )
  Actions.main()
}

const userLoginError = (erro, dispatch) => {
  dispatch(
    {
      type: USER_LOGIN_ERROR,
      payload: erro.mensagem
    }
  )
}
