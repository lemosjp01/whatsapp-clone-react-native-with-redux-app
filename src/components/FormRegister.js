import React, { Component } from 'react';
import { Button, ImageBackground, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { changeMail, changePassword, changeName, userRegister } from '../actions/AuthActions';

class formRegister extends Component {

    _userRegister() {

        const { nome, email, senha } = this.props;

        this.props.userRegister({ nome, email, senha });
    }
    render() {
        return (
            <ImageBackground
                style={{ flex: 1, width: null }}
                source={require('../imgs/bg.png')}
            >
                <View
                    style={{ flex: 1, padding: 10 }}
                >
                    <View
                        style={{ flex: 4, justifyContent: 'center' }}
                    >
                        <TextInput
                            value={this.props.nome}
                            placeholderTextColor='#fff'
                            placeholder='Nome'
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={text => this.props.changeName(text)}
                        />
                        <TextInput
                            value={this.props.email}
                            placeholderTextColor='#fff'
                            placeholder='E-mail' style={{ fontSize: 20, height: 45 }}
                            onChangeText={text => this.props.changeMail(text)}
                        />
                        <TextInput
                            secureTextEntry
                            value={this.props.senha}
                            placeholderTextColor='#fff'
                            placeholder='Senha'
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={text => this.props.changePassword(text)}
                        />
                        <Text
                            style={{ color: '#ff0000', fontSize: 18 }}>{this.props.registerError}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            title='Cadastrar'
                            color='#115e54'
                            onPress={() => this._userRegister()}
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => (
    {
        nome: state.AuthReducer.nome,
        email: state.AuthReducer.email,
        senha: state.AuthReducer.senha,
        registerError: state.AuthReducer.registerError
    }
);

export default connect(
    mapStateToProps,
    {
        changeMail,
        changePassword,
        changeName,
        userRegister
    }
)(formRegister);
