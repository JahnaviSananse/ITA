import { StyleSheet } from 'react-native';
import * as CONSTANT from '../../../constants/constant'
import * as scale from '../../../Utility/util'

let gridHeight = ((CONSTANT.SCREEN_WIDTH) / 3)
export default styles = StyleSheet.create({
   MainContainer: {
      justifyContent: 'center',
      flex: 1,
      marginHorizontal: 15,
   },
   imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 1,
      // marginTop: 5
   },
   itemTitle: {
      marginTop: 5,
      paddingBottom: 15,
      marginLeft: 5,
      fontSize: scale.normalize(14),
      // color: scale.changeFontColor("#1F3645")
   },
   badge: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: StyleSheet.hairlineWidth,
      height: 20,
      width: 20,
      position: "absolute"
   },
   SocialTopGrid: {
      paddingTop: 2,
      flexDirection: "row",
      width: CONSTANT.SCREEN_WIDTH,
      height: ((gridHeight * 2) + 20)
   },
   SocialTopGridImage: {
      width: '100%',
      height: '100%'
   },
   TopGridSmallImage: {
      //flex: 1,
      margin: 1
   }
});