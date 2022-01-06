import React, { useEffect, useState } from 'react';

import {
  TextInput,
  View
} from 'react-native';
import { Button } from '../Button';
import { COLORS } from '../../theme';

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

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
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
      />
    </View>
  );
}