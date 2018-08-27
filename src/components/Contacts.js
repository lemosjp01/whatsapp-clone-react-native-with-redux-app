import React, { Component } from 'react'
import { View, Text, ListView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'
import { fetchUserContacts } from '../actions/AppActions'

class Contacts extends Component {
  componentWillMount () {
    this.props.fetchUserContacts()
    this.createDataSource(this.props.contacts)
  }

  componentWillReceiveProps (nextProps) {
    this.createDataSource(nextProps.contacts)
  }

  createDataSource (contacts) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.localDataSource = ds.cloneWithRows(contacts)
  }

  renderRow (contact) {
    return (
      <TouchableHighlight onPress={ () => Actions.chat({ title: contact.nome, contactName: contact.nome, contactEmail: contact.email }) } underlayColor='#114d44' >
        <View
          style={{
            flex: 1,
            padding: 20,
            borderBottomWidth: 1,
            borderColor: '#ccc'
          }}
        >
          <Text style={{ fontSize: 25 }}>{contact.nome}</Text>
          <Text style={{ fontSize: 18 }}>{contact.email}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render () {
    return (
      <ListView
        enableEmptySections
        dataSource={this.localDataSource}
        renderRow={this.renderRow}
      />
    )
  }
}

const mapStateToProps = state => {
  const contacts = _.map(state.ContactsListReducer, (val, uid) => {
    return { ...val, uid }
  })
  return { contacts }
}

export default connect(
  mapStateToProps,
  { fetchUserContacts }
)(Contacts)
