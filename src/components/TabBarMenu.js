import React from 'react'
import firebase from 'firebase'
import { View, Text, StatusBar, Image, TouchableHighlight } from 'react-native'
import { TabBar } from 'react-native-tab-view'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { enableContactInclude } from '../actions/AppActions'

const TabBarMenu = props => (
  <View style={{ backgroundColor: '#115e54', elevation: 4, marginBottom: 6 }}>
    <StatusBar backgroundColor="#114d44" />

    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ height: 50, justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 20 }}>
          WhatsApp Clone
        </Text>
      </View>

      <View style={{ flexDirection: 'row', marginRight: 20 }}>
        <View
          style={{ width: 50, justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableHighlight
            onPress={() => {
              Actions.addContact()
              props.enableContactInclude()
            }}
            underlayColor="#114d44"
          >
            <Image source={require('../imgs/adicionar-contato.png')} />
          </TouchableHighlight>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <TouchableHighlight
            onPress={() => firebase.auth().signOut().then(() => Actions.formLogin())}
            underlayColor="#114d44"
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>Sair</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>

    <TabBar {...props} style={{ backgroundColor: '#115e54', elevation: 0 }} />
  </View>
)

export default connect(
  null,
  { enableContactInclude }
)(TabBarMenu)
