import { StyleSheet, Platform } from 'react-native';
import * as scale from '../../Utility/util'


export default styles = StyleSheet.create({
 modalContainer: {
  alignContent: 'center',
  height: '100%',
  width: '100%',
  paddingBottom: 100
 },
 modalQuestionText: {
  fontSize: scale.normalize(18),
  fontWeight: 'bold',
  marginTop: 20,
  marginLeft: 20,
//   color: scale.changeFontColor("#000000")
 },
 modalText: {
  padding: 10,
  marginLeft: 10,
  marginRight: 10,
  textAlign: 'justify',
//   color: scale.changeFontColor("#000000")
 },
});