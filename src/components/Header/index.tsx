import React from 'react';
import {
  View, Text, TouchableOpacity
} from 'react-native';
import { styles } from './styles'
import LogoSvg from '../../assets/logo.svg';
import { UserPhoto } from '../UserPhoto'
import { Auth } from '../../hooks';

export function Header() {
  const { user, signOut } = Auth()

  return (
    <View style={styles.container}>
      <LogoSvg />
      <View style={styles.logoutButton}>
        {
          user ?
            (<TouchableOpacity>
              <Text onPress={signOut} style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>)
            : null
        }
        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}