import React, { Component } from 'react'
import { View, Text, ListView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'
import { chatsUserFetch } from '../actions/AppActions'

class Chats extends Component {
  componentWillMount () {
    this.props.chatsUserFetch()
    this.criaFonteDeDados(this.props.chats)
  }

  componentWillReceiveProps (nextProps) {
    this.criaFonteDeDados(nextProps.chats)
  }

  criaFonteDeDados (chats) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.dataSource = ds.cloneWithRows(chats)
  }

  renderRow (chat) {
    return (
            <TouchableHighlight onPress={
                () => Actions.chat({ title: chat.nome, contactName: chat.nome, contactEmail: chat.email })
            } underlayColor='#114d44' >
                <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 25 }}>{chat.nome}</Text>
                </View>
            </TouchableHighlight>
    )
  }

  render () {
    return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
    )
  }
}

const mapStateToProps = state => {
  const chats = _.map(state.ListChatsReducer, (val, uid) => {
    return { ...val, uid }
  })

  return {
    chats
  }
}

export default connect(mapStateToProps, { chatsUserFetch })(Chats)
