import React from 'react';
import {
  View, Text, TouchableOpacity
} from 'react-native';
import { styles } from './styles'
import { LogoSvg } from './Svg';
import { UserPhoto } from '../UserPhoto'

export function Header() {
  return (
    <View style={styles.container}>
      <LogoSvg />
      <View style={styles.logoutButton}>
        <TouchableOpacity>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
        <UserPhoto imageUri="" />
        </View>
    </View>
  );
}