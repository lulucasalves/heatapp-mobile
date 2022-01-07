import React from 'react';

import {
  View
} from 'react-native';
import { COLORS } from '../../theme';
import { Button } from '../Button'
import { Auth } from '../../hooks'
import { styles } from './styles';

export function SignInBox() {
  const { signIn, isSigningIn } = Auth()

  return (
    <View style={styles.container}>
      <Button
        icon='github'
        title="ENTRAR COM O GITHUB"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        onPress={signIn}
        isLoading={isSigningIn}
      />

    </View>
  );
}