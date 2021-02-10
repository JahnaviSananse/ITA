import { StyleSheet, Platform } from 'react-native';
import * as scale from '../../Utility/util'

let top = Platform.OS === 'ios' ? 58 : 61
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: scale.changeBackgroundColor("#E2E2E2"),
        flexDirection: "row"
    },
    // navBar: {
    //  height: 90,
    // },
    containerList: {
        //   backgroundColor: scale.changeBackgroundColor("#E2E2E2"),
        flexDirection: "row",
        // paddingTop: 10,
        // backgroundColor: "red",
        width: '100%'
    },
    filterButton: {
        height: 35,
        width: 35,
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        right: 10,
        top: top
    },
    fundCell: {
        // paddingTop: 10,
        height: '100%',
        width: '100%',
        //   backgroundColor: scale.changeBackgroundColor("#E2E2E2"),
    },
    hideTabbarBottomLine: {
        position: "absolute",
        width: '100%',
        backgroundColor: "transparent",
        borderBottomWidth: 2,
        borderBottomColor: "#E2E2E2",
        height: 2,
        top: Platform.OS === 'ios' ? 92 : 94
    },
    //searchbar
    viewStyle: {
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: scale.changeHeaderColor('#E7E8E9'),
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60
    },
    headerContainer: {
        // backgroundColor: scale.changeHeaderColor('#E7E8E9'),
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
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    cancelText: {
        color: "#89B4B6",
        fontSize: scale.normalize(18)
    },
    clearButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        position: 'absolute',
        right: 5
    }

});
