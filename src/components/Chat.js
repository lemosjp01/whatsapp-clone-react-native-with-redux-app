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
    if (this.props.contactEmail !== nextProps.contactEmail) {
      this.props.fetchUserChat(nextProps.contactEmail)
    }
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
    if (texto.tipo === 'Enviada') {
      return (
        <View style={{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40 }} >
          <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#dbf5b4', elevation: 1 }} >{texto.mensagem}</Text>
        </View>
      )
    }
    return (
      <View style={{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40 }} >
          <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#f7f7f7', elevation: 1 }} >{texto.mensagem}</Text>
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
