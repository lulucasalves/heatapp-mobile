import { createContext, useEffect, useState, useContext } from 'react'
import React from 'react'
import { api } from '../services/api'
import * as AuthSessions from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [isSigningIn, setIsSigningIn] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const clientId = 'af60016e2f4bfbbd3074'

  async function signIn() {
    try {
      setIsSigningIn(true)
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user`
      const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse

      if (
        authSessionResponse.type == 'success' &&
        authSessionResponse.params.error !== 'access_denied'
      ) {

        const authResponse = await api.post('/authenticate', {
          code: authSessionResponse.params.code
        })

        const { user, token } = authResponse.data as AuthResponse

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await AsyncStorage.setItem('@nlw:user', JSON.stringify(user))
        await AsyncStorage.setItem('@nlw:token', token)

        setUser(user)

      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSigningIn(false)
    }

  }

  async function signOut() {
    await AsyncStorage.removeItem('@nlw:user')
    await AsyncStorage.removeItem('@nlw:token')

    setUser(null)
  }

  useEffect(() => {
    async function loadUser() {
      const userStorage = await AsyncStorage.getItem('@nlw:user')
      const tokenStorage = await AsyncStorage.getItem('@nlw:token')

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`

        setUser(JSON.parse(userStorage))
      }

      setIsSigningIn(false)
    }

    loadUser()
  }, [])

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