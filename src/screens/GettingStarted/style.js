import { StyleSheet, Dimensions } from 'react-native';
import * as CONSTANT from '../../constants/constant'
import * as scale from '../../Utility/util'

let screenWidth = Dimensions.get('screen').width

export default styles = StyleSheet.create({
 flatlistContainer: {
  height: '100%',
  width: screenWidth,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: scale.changeBackgroundColor("transparent")
 },
 getStartedButton: {
//   backgroundColor: scale.changeButtonColor("#233746"),
  justifyContent: 'center',
  height: 50,
  width: (screenWidth - 80),
  borderRadius: 5,
  alignItems: 'center',
  marginHorizontal: 25,
  marginTop: 25
 },
 skipButton: {
  position: "absolute",
  top: 10,
  right: 15,
//   color: scale.changeFontColor("#1D343A"),
  fontSize: CONSTANT.ITEMS_FONT,
 },
 nextButton: {
  height: 50,
  width: 50,
  // position: 'absolute',
  // alignSelf: "center",
  // bottom: '10%',
 }
});
