import firebase from 'firebase'
import b64 from 'base-64'
import _ from 'lodash'
import { CHANGE_EMAIL_ADD_CONTACT, ADD_CONTACT_ERROR, ADD_CONTACT_SUCESS, USER_CONTACT_LIST } from './Types'

const addContactError = (erro, dispatch) => (
  dispatch(
    {
      type: ADD_CONTACT_ERROR,
      payload: erro
    }
  )
)

const addContactSucess = dispatch => (
  dispatch(
    {
      type: ADD_CONTACT_SUCESS,
      payload: true
    }
  )
)

export const enableContactInclude = () => (
  {
    type: ADD_CONTACT_SUCESS,
    payload: false
  }
)

export const fetchUserContacts = () => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    let emailUserB64 = b64.encode(currentUser.email)

    firebase.database().ref(`/usuario_contatos/${emailUserB64}`)
      .on('value', snapshot => {
        dispatch(
          {
            type: USER_CONTACT_LIST,
            payload: snapshot.val()
          }
        )
      })
  }
}

export const changeEmailAddContact = text => {
  return {
    type: CHANGE_EMAIL_ADD_CONTACT,
    payload: text
  }
}

export const addContact = email => {
  return dispatch => {
    let emailB64 = b64.encode(email)

    firebase.database().ref(`/contatos/${emailB64}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            // email do novo contado
            const dataUser = _.first(_.values(snapshot.val()))
            // email do usuario autenticado
            const { currentUser } = firebase.auth()
            let emailUserB64 = b64.encode(currentUser.email)

            firebase.database().ref(`/usuario_contatos/${emailUserB64}`)
                .push({ email: email, nome: dataUser.nome })
                .then(() => addContactSucess(dispatch))
                .catch(erro => addContactError(erro.message, dispatch))
          } else {
            dispatch(
                  { type: ADD_CONTACT_ERROR, payload: 'E-mail informado não corresponde a nenhum usuário cadastrado!' }
                )
          }
        })
  }
}
