import { createContext, useEffect, useState, useContext } from 'react'
import React from 'react'
import { api } from '../services/api'
import * as AuthSessions from 'expo-auth-session';
export const MyContext = createContext({} as AuthContextData)

type User = {
  id: string
  avatar_url: string
  name: string
  login: string
}

type AuthContextData = {
  user: User | null
  isSigningIn: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthResponse = {
  token: string
  user: User
}

type AuthorizationResponse = {
  params: {
    code?: string
    error?: string
  },
  type?: string
}

function Provider({ children }: AuthProviderProps) {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const clientId = 'dd91f61c9d5325171262'

  async function signIn() {
    const authUrl = `https://github.com/login/oauth/authorize?scope=read:user&client_id=${clientId}`
    const { params } = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse

    console.log(params)
  }

  async function signOut() {

  }


  return (
    <MyContext.Provider value={{
      signIn,
      signOut,
      user,
      isSigningIn
    }}>
      {children}
    </MyContext.Provider>
  )
}

function Auth() {
  const context = useContext(MyContext)

  return context
}

export {
  Provider, Auth
}