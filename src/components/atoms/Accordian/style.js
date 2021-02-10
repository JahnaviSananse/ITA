import { StyleSheet, Dimensions } from 'react-native';
import * as scale from '../../../Utility/util'

let width = Dimensions.get("screen").width
export default styles = StyleSheet.create({
 container: {
  justifyContent: 'center',
  alignItems: 'center'
 },
 fontParent: {
  width: width - 90,
  fontSize: scale.normalize(17),
  fontWeight: 'bold',
//   color: scale.changeFontColor("#000000"),
 },
 fontChild: {
  fontSize: scale.normalize(17),
//   color: "black",
 },
 button: {
  width: '100%',
  height: 54,
  alignItems: 'center',
  paddingLeft: 15,
  paddingRight: 25,
  fontSize: scale.normalize(15),
 },
 itemActive: {
  fontSize: scale.normalize(15),
  color: "#0da935",
 },
 itemInActive: {
  fontSize: scale.normalize(15),
//   color: scale.changeFontColor("#6A6A6A"),
 },
 btnActive: {
  borderColor: "#0da935",
 },
 btnInActive: {
  borderColor: 'black',
 },
 row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: 56,
  paddingLeft: 15,
  paddingRight: 25,
  alignItems: 'center',
//   backgroundColor: scale.changeBackgroundColor('#FFFFFF'),
 },
 childRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
//   backgroundColor: scale.changeBackgroundColor("#FFFFFF"),

 },
 parentHr: {
  height: 1,
  color: 'white',
  width: '100%'
 },
 childHr: {
  height: 1,
  width: '100%',
 },
 colorActive: {
  borderColor: "#0da935",
 },
 colorInActive: {
  borderColor: 'black',
 },
 iconStyle: {
  height: 15,
  width: 15,
  marginRight: 10
 },
 selectionRowLogo: {
  marginRight: 10,
  height: 17,
  width: 17
 },
 iconStyle: {
  height: 17,
  width: 17
 },
 item1: {
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  backgroundColor: "red" // if you want to fill rows left to right
 },
 item2: {
  width: '50%' // is 50% of container width
 },
 boxStyle: {
  height: 50,
  width: 50,
  backgroundColor: "yellow",
  // margin: 10
 }
});
