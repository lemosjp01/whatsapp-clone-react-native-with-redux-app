import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormRegister from './components/FormRegister';
import Welcome from './components/Welcome';

export default props => (

    <Router>
        <Stack>
            <Scene key='formLogin' component={FormLogin} title='Login' />
            <Scene key='formRegister' component={FormRegister} title='Cadastro' />
            <Scene key='welcome' component={Welcome} title='Bem-Vindo' />
        </Stack>
    </Router>

);
