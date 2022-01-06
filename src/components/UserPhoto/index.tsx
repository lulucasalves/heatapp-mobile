import React from 'react';
import {
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import avatarImg from '../../assets/avatar.png';
import { styles } from './styles';
import { COLORS } from '../../theme';

const SIZES = {
  SMALL: {
    containerSize: 30,
    avatarSize: 28,
  },
  NORMAL: {
    containerSize: 46,
    avatarSize: 42,
  }
}

type Props = {
  imageUri: string | undefined,
  sizes?: 'SMALL' | 'NORMAL'
}

export function UserPhoto({ imageUri, sizes = 'NORMAL' }: Props) {
  const { containerSize, avatarSize } = SIZES[sizes]

  return (
    <LinearGradient
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2
        }
      ]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
      colors={[COLORS.PINK, COLORS.YELLOW]}>
      <Image
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2
          }
        ]}
        source={{ uri: imageUri || avatarImg }}
      />
    </LinearGradient>
  )

}