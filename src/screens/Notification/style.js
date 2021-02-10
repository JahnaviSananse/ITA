import { StyleSheet } from 'react-native';
import * as COLOR from '../../constants/colors';

export default styles = StyleSheet.create({
 container: {
  justifyContent: "center",
  backgroundColor: "#FFFFFF"
 },
 switchStyle: {
  position: "absolute",
  marginTop: 5,
  right: 10,
  transform: [{ scaleX: .8 }, { scaleY: .8 }]
 },
});
