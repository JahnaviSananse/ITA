import { StyleSheet } from 'react-native';
import * as COLOR from '../../constants/colors'
import * as scale from '../../Utility/util'
import { colors } from 'react-native-elements';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.MAIN_BG_COLOR
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20
    },
    title: {
        fontSize: scale.normalize(20),
        fontWeight: "bold",
        marginTop: 25,
        // color: scale.changeFontColor("#000000")
    },
    desc: {
        paddingTop: 15,
        fontSize: scale.normalize(17),
        // color: scale.changeFontColor("#000000")
    }
});