import { StyleSheet, Platform } from 'react-native';

export default styles = StyleSheet.create({
 hideTabbarBottomLine: {
  position: "absolute",
  width: '100%',
  backgroundColor: "transparent",
  borderBottomWidth: 2,
  borderBottomColor: "white",
  height: 2,
  top: Platform.OS === 'ios' ? 92 : 94
 }
});