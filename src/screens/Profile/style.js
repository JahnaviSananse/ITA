import { StyleSheet, Platform } from 'react-native';
import * as scale from '../../Utility/util'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        marginBottom: 30,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    favoriteContainer: {
        height: '100%',
        width: "100%",
        backgroundColor: scale.changeBackgroundColor("#FFFFFF"),
        justifyContent: "center",
        alignItems: "center"
    },
    hideTabbarBottomLine: {
        position: "absolute",
        width: '100%',
        backgroundColor: "transparent",
        borderBottomWidth: 2,
        borderBottomColor: "white",
        height: 2,
        top: Platform.OS === 'ios' ? 112 : 114
    }
});
