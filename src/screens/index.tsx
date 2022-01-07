import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native"
import { Header } from "../components/Header";
import { MessageList } from "../components/MessageList";
import { SendMessageForm } from "../components/SendMessageForm";
import { SignInBox } from "../components/SignInBox";
import { Auth } from "../hooks";
import { styles } from "./styles"

export function Home() {
  const { user } = Auth()
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Header />
        <MessageList />
        {user ? <SendMessageForm /> : <SignInBox />}
      </View>
    </KeyboardAvoidingView>
  )
}