import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'

import FormLogin from './components/FormLogin'
import FormRegister from './components/FormRegister'
import Welcome from './components/Welcome'
import Main from './components/Main'

export default props => (

    <Router navigationBarStyle={{ backgroundColor: '#115e54' }} titleStyle={{ color: '#fff' }} >
        <Stack>
            <Scene key='formLogin' component={FormLogin} title='Login' hideNavBar={ true } />
            <Scene key='formRegister' component={FormRegister} title='Cadastro' />
            <Scene key='welcome' component={Welcome} title='Bem-Vindo'
            hideNavBar={ true } />
            <Scene key='main' component={Main} title='Main'
            hideNavBar={ true } />
        </Stack>
    </Router>

)
