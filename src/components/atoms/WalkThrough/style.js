import { StyleSheet, Dimensions } from 'react-native';
import * as CONSTANT from '../../../constants/constant'
import * as scale from '../../../Utility/util'

let width = Dimensions.get("screen").width

export default styles = StyleSheet.create({
 iconStyle: {
  height: 50,
  width: 50
 },
 headingText: {
  marginTop: 25,
  width: (width / 1.5),
  textAlign: "center",
  fontSize: scale.normalize(30),
//   color: scale.changeFontColor("#233746"),
  fontWeight: "bold"
 },
 descText1: {
  marginTop: 40,
  textAlign: "center",
  marginHorizontal: 20,
  fontSize: scale.normalize(16),
//   color: scale.changeFontColor("#233746"),
 },
 descText2: {
  marginTop: 40,
  textAlign: "center",
  marginHorizontal: 20,
  fontSize: CONSTANT.ITEMS_FONT,
//   color: scale.changeFontColor("#233746"),
 }
});
