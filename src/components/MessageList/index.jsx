import React from 'react'
import { ScrollView } from 'react-native'
import { Message } from '../Message'

import { styles } from './styles'

export function MessageList() {
  const data = {
    id: '1',
    text: 'Texto de teste',
    user: {
      name: 'user',
      avatar_url: ''
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      <Message data={data} />
      <Message data={data} />
      <Message data={data} />
    </ScrollView>
  )
}
