import { StyleSheet, Platform, Dimensions } from 'react-native';


let screenHeight = Dimensions.get("screen").height
let topAndroid = ((44 * screenHeight) / 868.57)
let topIOS = ((42 * screenHeight) / 667)
import * as COLOR from '../../constants/colors'
import * as scale from '../../Utility/util'
import { colors } from 'react-native-elements';

export default styles = StyleSheet.create({
    hideTabbarBottomLine: {
        position: "absolute",
        width: '100%',
        backgroundColor: "yellow",
        borderBottomWidth: 2,
        borderBottomColor: "white",
        // height: "5%"
        top: Platform.OS === 'ios' ? '7%' : '5.9%'
        // top: 

    }
});