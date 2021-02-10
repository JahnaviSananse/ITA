import { StyleSheet } from 'react-native';
import * as COLOR from '../../constants/colors'
import * as scale from '../../Utility/util'

export default styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',        
    },
    switchStyle: {
        margin: 15,
        transform: [{ scaleX: .8 }, { scaleY: .8 }]
    },
    textStyle: {
        padding: 15,
        fontSize: scale.normalize(17),
        color: scale.changeFontColor("#6b6b6a")
    },
    descText: style = {
        marginTop: 15,        
    },
    switchContainer: {
        width: '100%',
        justifyContent: "space-between",
        flexDirection: "row"
    },
    textContainer: {
        marginTop: 30,
        marginHorizontal: 15,
        height: 200
    }
});