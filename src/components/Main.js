import * as React from 'react'
import { Dimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import TabBarMenu from './TabBarMenu'
import Chats from './Chats'
import Contacts from './Contacts'

export default class Main extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Conversas' },
      { key: '2', title: 'Contatos' }
    ]
  }

  _handleChangeTab = index => this.setState({index})

  _renderHeader = props => <TabBarMenu {...props} />

  _renderScene = SceneMap({
    '1': Chats,
    '2': Contacts
  })

  render () {
    return (
      <TabView
        navigationState={this.state}
        renderTabBar={this._renderHeader}
        renderScene={this._renderScene}
        onIndexChange={this._handleChangeTab}
        initialLayout={{ width: Dimensions.get('window').width, height: 30 }}
      />
    )
  }
}
