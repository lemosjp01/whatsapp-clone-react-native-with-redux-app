import React, { Component } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { connect } from 'react-redux'
import { changeEmailAddContact, addContact } from '../actions/AppActions'

class AddContact extends Component {
  renderAddContact () {
    if (!this.props.register_result_include) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
              placeholder="E-mail"
              style={{ fontSize: 20, height: 45 }}
              onChangeText={texto => this.props.changeEmailAddContact(texto)}
              value={this.props.add_email_contact}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Adicionar Contato"
              color="#115e54"
              onPress={() =>
                this.props.addContact(this.props.add_email_contact)
              }
            />

            <Text style={{ color: '#ff0000', fontSize: 20 }}>
              {this.props.txt_register_result_error}
            </Text>
          </View>
        </View>
      )
    } else {
      return (
            <View>
                <Text style={{ fontSize: 20 }} >Contato adicionado com sucesso!</Text>
            </View>
      )
    }
  }

  render () {
    return <View style={{ flex: 1, justifyContent: 'center', padding: 20 }} >
        { this.renderAddContact() }
    </View>
  }
}

const mapStateToProps = state => ({
  add_email_contact: state.AppReducer.add_email_contact,
  txt_register_result_error: state.AppReducer.txt_register_result_error,
  register_result_include: state.AppReducer.register_result_include
})

export default connect(
  mapStateToProps,
  { changeEmailAddContact, addContact }
)(AddContact)
