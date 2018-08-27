import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { View, Text, ListView, TextInput, Image, TouchableHighlight } from 'react-native'
import { changeMessage, sendMessage, fetchUserChat } from '../actions/AppActions'

class Chat extends Component {
  componentWillMount () {
    this.props.fetchUserChat(this.props.contactEmail)
    this.createDataSource(this.props.chat)
  }

  componentWillReceiveProps (nextProps) {
    this.createDataSource(nextProps.chat)
  }

  createDataSource (chat) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.dataSource = ds.cloneWithRows(chat)
  }
  _sendMessage () {
    const { mensagem, contactName, contactEmail } = this.props

    this.props.sendMessage(mensagem, contactName, contactEmail)
  }

  renderRow (texto) {
    return (
      <View>
        <Text>{texto.mensagem}</Text>
        <Text>{texto.tipo}</Text>
      </View>
    )
  }

  render () {
    return (
        <View style={{ flex: 1, backgroundColor: '#eee4dc', padding: 10 }}>
            <View style={{ flex: 1, paddingBottom: 20 }}>
              <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
              />
            </View>
            <View style={{ height: 60, flexDirection: 'row' }}>
                <TextInput style={{ flex: 4, backgroundColor: '#fff', fontSize: 18 }} value={this.props.mensagem} onChangeText={ texto => this.props.changeMessage(texto) } />
                <TouchableHighlight onPress={ this._sendMessage.bind(this) } underlayColor='#fff' >
                    <Image source={require('../imgs/enviar_mensagem.png')} />
                </TouchableHighlight>
            </View>
        </View>
    )
  }
}

const mapStateToProps = state => {
  const chat = _.map(state.ChatListReducer, (val, uid) => {
    return { ...val, uid }
  })

  return ({
    chat: chat,
    mensagem: state.AppReducer.mensagem
  })
}

export default connect(mapStateToProps, { changeMessage, sendMessage, fetchUserChat })(Chat)
