const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    registerError: '',
    loginError: ''
}

export default (state = INITIAL_STATE, action) => {
    if (action.type == 'change_name') {
        return { ...state, nome: action.payload }
    }
    if (action.type == 'change_mail') {
        return { ...state, email: action.payload }
    }
    if (action.type == 'change_password') {
        return { ...state, senha: action.payload }
    }
    if (action.type == 'user_register_error') {
        return { ...state, registerError: action.payload }
    }
    if (action.type == 'user_register_sucess') {
        return { ...state, nome: '', senha: '' }
    }
    if (action.type == 'user_login_error') {
        return { ...state, loginError: action.payload }
    }
    return state;
}
