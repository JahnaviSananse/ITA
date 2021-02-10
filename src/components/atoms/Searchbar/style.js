import { StyleSheet, Platform } from 'react-native';
import * as color from '../../../constants/colors'
import * as scale from '../../../Utility/util'

export default styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'row',
        width: '100%',
        position: "absolute",
        top: 0,
        backgroundColor: scale.changeHeaderColor('#E7E8E9'),
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60
    },
    headerContainer: {
        backgroundColor: scale.changeHeaderColor('#E7E8E9'),
        height: 50,
        width: '100%',
        flexDirection: "row",
    },
    searchbarContainer: {
        backgroundColor: "#F6FCFD",
        borderRadius: 4,
        width: "75%",
        margin: 8,
        marginLeft: 15,
        marginRight: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    iconContainer: {
        height: 20,
        width: 20,
        position: "absolute",
        left: 10
    },
    icon: {
        height: 20,
        width: 20
    },
    textFieldContainer: {
        // height: '100%',
        width: '85%',
        position: "absolute",
        right: 0
    },
    cancelButtonContainer: {
        marginLeft: 0,
        alignSelf: "center",
        height: '100%',
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    cancelText: {
        color: "#89B4B6",
        fontSize: 18
    }

});