import React from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { connect } from 'react-redux'
import { changeEmailAddContact, addContact } from '../actions/AppActions'

const AddContact = props => (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput placeholder='E-mail' style={{ fontSize: 20, height: 45 }} onChangeText={(text) => props.changeEmailAddContact(text)} value={props.add_email_contact} />
        </View>
        <View style={{ flex: 1 }}>
            <Button title='Adicionar Contato' color='#115e54' onPress={() => props.addContact(props.add_email_contact)} />

            <Text style={{ color: '#ff0000', fontSize: 20 }} >
                {props.txt_register_result_error}
            </Text>
        </View>
    </View>
)

const mapStateToProps = state => (
  {
    add_email_contact: state.AppReducer.add_email_contact,
    txt_register_result_error: state.AppReducer.txt_register_result_error
  }
)

export default connect(mapStateToProps, { changeEmailAddContact, addContact })(AddContact)
