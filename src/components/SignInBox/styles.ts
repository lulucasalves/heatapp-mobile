import { StyleSheet } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
  container: {
    paddingBottom: getBottomSpace() + 32,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  }
})
