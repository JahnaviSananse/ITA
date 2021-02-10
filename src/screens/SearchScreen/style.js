import { StyleSheet, Dimensions } from 'react-native';
import * as COLOR from '../../constants/colors'
import * as scale from '../../Utility/util'
import * as fonts from '../../constants/fonts/index'
let width = Dimensions.get("screen").width
let height = Dimensions.get("screen").height

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        // backgroundColor: "#FFFFFF"
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20
    },
    text: {
        fontSize: 30
    },
    containerSearchResult: {
        height: 70,
        alignItems: "center",
        flexDirection: "row",
        width: '100%',
        borderBottomColor: "gray",
        borderBottomWidth: 0.2,
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    searchLogo: {
        width: 40,
        height: 40,
        marginLeft: 10
    },
    containerDetail: {
        marginLeft: 10,
        marginTop: 3,
        marginRight: 120
    },
    searchTitle: {
        // color: "black",
        fontSize: scale.normalize(15),
        width: width - 140,
        fontFamily: fonts.FONT_SFPRO_REGULAR,
    },
    type: {
        color: "black",
        fontSize: scale.normalize(12),
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    grayDot: {
        backgroundColor: "gray",
        borderRadius: 3,
        height: 6,
        width: 6,
        alignSelf: "center",
        marginLeft: 10
    },
    fileSize: {
        marginLeft: 10,
        color: "black",
        fontSize: scale.normalize(12),
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    containerIcon: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        right: 0,
        bottom: 0,
        height: 70,
        width: 80
    },
    uploadIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
        marginBottom: 5
    },
    //searchbar
    viewStyle: {
        flexDirection: 'row',
        width: '100%',
        position: "absolute",
        top: 0,
        // backgroundColor: scale.changeHeaderColor('#E7E8E9'),
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
        right: 0,
        paddingRight: '12%'

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