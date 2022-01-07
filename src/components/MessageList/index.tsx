import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { io } from 'socket.io-client'
import { api } from '../../services/api'
import { Message, MessageProps } from '../Message'
import { styles } from './styles'
import { MESSAGES_EXAMPLE } from '../../../utils/messages'

let messagesQueue: MessageProps[] = MESSAGES_EXAMPLE

const socket = io(String(api.defaults.baseURL))
socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage)
})

export function MessageList() {
  const [message, setMessage] = useState<MessageProps[]>([])

  useEffect(() => {
    async function getMessages() {
      await api.get<MessageProps[]>('/messages/last3').then(res => setMessage(res.data)
      )
    }
    getMessages()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessage(prev =>
          [messagesQueue[0], prev[0], prev[1]])
        messagesQueue.shift()
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {message.map(val => { return <Message key={val.id} data={val} /> })}

    </ScrollView>
  )
}
