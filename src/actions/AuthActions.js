import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';

export const changeMail = (text) => {
    return {
        type: 'change_mail',
        payload: text
    }
}

export const changePassword = (text) => {
    return {
        type: 'change_password',
        payload: text
    }
}

export const changeName = (text) => {
    return {
        type: 'change_name',
        payload: text
    }
}

export const userRegister = ({ nome, email, senha }) => {
    return dispatch => {
        firebase.auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(user => {
                let emailB64 = b64.encode(email);

                firebase.database().ref(`/contatos/ ${emailB64}`)
                    .push({ nome })
                    .then(value => userRegisterSucess(dispatch))
            })
            .catch(erro => userRegisterError(erro, dispatch));
    }
}

const userRegisterSucess = (dispatch) => {
    dispatch({ type: 'user_register_sucess' });

    Actions.welcome();
}

const userRegisterError = (erro, dispatch) => {
    dispatch({ type: 'user_register_error', payload: erro.message });
}

export const authUser = ({ email, senha }) => {

    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => userLoginSucess(dispatch))
            .catch(erro => userLoginError(erro, dispatch));
    }
}

const userLoginSucess = (dispatch) => {
    dispatch(
        {
            type: 'user_login_sucess'
        }
    );
}

const userLoginError = (erro, dispatch) => {
    dispatch(
        {
            type: 'user_login_error',
            payload: erro.message
        }
    );
}
