import React from 'react'
import { View, TextInput, Button } from 'react-native'

export default props => (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput placeholder='E-mail' style={{ fontSize: 20, height: 45 }} onChange={() => false} />
        </View>
        <View style={{ flex: 1 }}>
            <Button title='Adicionar Contato' color='#115e54' onPress={() => false} />
        </View>
    </View>
)
