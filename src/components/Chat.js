import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, Image, TouchableHighlight } from 'react-native'
import { changeMessage, sendMessage } from '../actions/AppActions'

class Chat extends Component {

  _sendMessage () {
    const { message, contactName, contactEmail } = this.props

    this.props.sendMessage(message, contactName, contactEmail)
  }

  render () {
    return (
        <View style={{ flex: 1, backgroundColor: '#eee4dc', padding: 10 }}>
            <View style={{ flex: 1, paddingBottom: 20 }}>

            </View>
            <View style={{ height: 60, flexDirection: 'row' }}>
                <TextInput style={{ flex: 4, backgroundColor: '#fff', fontSize: 18 }} value={this.props.message} onChangeText={ textMessage => this.props.changeMessage(textMessage) } />
                <TouchableHighlight onPress={ this._sendMessage.bind(this) } underlayColor='#fff' >
                    <Image source={require('../imgs/enviar_mensagem.png')} />
                </TouchableHighlight>
            </View>
        </View>
    )
  }
}

const mapStateToProps = state => {
  return ({
    message: state.AppReducer.message
  })
}

export default connect(mapStateToProps, { changeMessage, sendMessage })(Chat)
