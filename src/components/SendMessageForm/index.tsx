import React, { useState } from 'react';

import {
  Alert,
  Keyboard,
  TextInput,
  View
} from 'react-native';
import { Button } from '../Button';
import { COLORS } from '../../theme';

import { styles } from './styles';
import { api } from '../../services/api';

export function SendMessageForm() {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  async function handleMessage() {

    if (message.length > 0) {
      setSending(true)
      await api.post('/messages', { message: message })
      setMessage('')
      Keyboard.dismiss()
      setSending(false)
      Alert.alert('Mensagem enviada com sucesso!')
    }
    else {
      Alert.alert('Escreva um mensagem para enviar')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance='dark'
        multiline={true}
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        maxLength={140}
        style={styles.input}
        onChangeText={setMessage}
        value={message}
        editable={!sending}
      />
      <Button
        onPress={handleMessage}
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sending}
      />
    </View>
  );
}