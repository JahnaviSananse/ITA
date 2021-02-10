import { StyleSheet } from 'react-native';
import * as scale from '../../../Utility/util'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: scale.changeBackgroundColor("#FFFFFF")
    },
    title: {
        height: 50,
        fontSize: scale.normalize(15),
        fontWeight: "600",
        textAlign: "center",
    },
    placeholderImage: {
        height: 70,
        width: 70,
        alignSelf: "center"
    },
    description: {
        marginTop: 25,
        height: 200,
        fontWeight: "normal",
        fontSize: scale.normalize(15),
        textAlign: "center",        
    }
});
