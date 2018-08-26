import firebase from 'firebase'
import b64 from 'base-64'
import _ from 'lodash'
import { CHANGE_EMAIL_ADD_CONTACT, ADD_CONTACT_ERROR } from './Types'

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
            alert(dataUser)


            // email do usuario autenticado
            const { currentUser } = firebase.auth()
            let emailUserB64 = b64.encode(currentUser.email)

            firebase.database().ref(`/usuario_contatos/${emailUserB64}`)
                .push({ email: email, nome: dataUser.nome })
                .then(() => alert('Sucess!'))
                .catch(erro => alert(erro))
          } else {
            dispatch(
                  { type: ADD_CONTACT_ERROR, payload: 'E-mail informado não corresponde a nenhum usuário cadastrado!' }
                )
          }
        })
  }
}
