import firebase from 'firebase'
import b64 from 'base-64'
import _ from 'lodash'
import { CHANGE_EMAIL_ADD_CONTACT, ADD_CONTACT_ERROR, ADD_CONTACT_SUCESS, USER_CONTACT_LIST, CHANGE_MESSAGE, USER_CHAT_LIST, SEND_MESSAGE_SUCESS } from './Types'

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
    let userEmailB64 = b64.encode(currentUser.email)

    firebase.database().ref(`/usuario_contatos/${userEmailB64}`)
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

export const changeMessage = texto => {
  return ({
    type: CHANGE_MESSAGE,
    payload: texto
  })
}

export const sendMessage = (mensagem, contactName, contactEmail) => {
  // dados do usuário (email)
  const { currentUser } = firebase.auth()
  const userEmail = currentUser.email

  return dispatch => {
// convertendo para a base 64
    const userEmailB64 = b64.encode(userEmail)
    const contactEmailB64 = b64.encode(contactEmail)

    firebase.database().ref(`/mensagens/${userEmailB64}/${contactEmailB64}`)
      .push({ mensagem, tipo: 'Enviada' })
      .then(() => {
        firebase.database().ref(`/mensagens/${contactEmailB64}/${userEmailB64}`)
          .push({ mensagem, tipo: 'Recebida' })
          .then(() => dispatch({ type: SEND_MESSAGE_SUCESS }))
      })
      .then(() => {
        firebase.database().ref(`/usuario_conversas/${userEmailB64}/${contactEmailB64}`)
          .set({ nome: contactName, email: contactEmail })
      })
      .then(() => {
        firebase.database().ref(`/contatos/${userEmailB64}`)
          .once('value')
          .then(snapshot => {
            const dataUser = _.first(_.values(snapshot.val()))

            firebase.database().ref(`/usuario_conversas/${contactEmailB64}/${userEmailB64}`)
            .set({ nome: dataUser.nome, email: userEmail })
          })
      })
  }
}

export const fetchUserChat = contactEmail => {
  const { currentUser } = firebase.auth()

  let userEmailB64 = b64.encode(currentUser.email)
  let contactEmailB64 = b64.encode(contactEmail)

  return dispatch => {
    firebase.database().ref(`/mensagens/${userEmailB64}/${contactEmailB64}`)
    .on('value', snapshot => {
      dispatch({ type: USER_CHAT_LIST, payload: snapshot.val() })
    })
  }
}

export const changeEmailAddContact = texto => {
  return {
    type: CHANGE_EMAIL_ADD_CONTACT,
    payload: texto
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
            let userEmailB64 = b64.encode(currentUser.email)

            firebase.database().ref(`/usuario_contatos/${userEmailB64}`)
                .push({ email: email, nome: dataUser.nome })
                .then(() => addContactSucess(dispatch))
                .catch(erro => addContactError(erro.mensagem, dispatch))
          } else {
            dispatch(
                  { type: ADD_CONTACT_ERROR, payload: 'E-mail informado não corresponde a nenhum usuário cadastrado!' }
                )
          }
        })
  }
}
