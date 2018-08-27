import React, { Component } from 'react'
import { View, Text, ListView } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
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
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.localDataSource = ds.cloneWithRows(contacts)
  }

  render () {
    return (
      <ListView enableEmptySections
        dataSource={this.localDataSource}
        renderRow={data => (
            <View>
                <Text>{data.nome}</Text>
                <Text>{data.email}</Text>
            </View>
            )
        } />
    )
  }
}

const mapStateToProps = state => {
  const contacts = _.map(state.ContactsListReducer, (val, uid) => {
    return { ...val, uid }
  })
  return { contacts }
}

export default connect(mapStateToProps, {fetchUserContacts})(Contacts)
