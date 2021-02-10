import { Dimensions, StyleSheet } from 'react-native';
import * as fonts from '../../../constants/fonts/index';
import * as scale from '../../../Utility/util';

let width = Dimensions.get('screen').width
export default styles = StyleSheet.create({
    descContainer: {
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 25,
    },
    videoDetails: {
        paddingTop: 5,
        paddingHorizontal: 15,
        flex: 1
    },

    rowContainer: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    icon: {
        marginLeft: 20,
        height: 20,
        width: 20
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingLeft: 15
    },
    saperator: {
        backgroundColor: 'gray',
        height: 0.5,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 10
    },
    cancelButton: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topLabelForVideo: {
        paddingTop: 5,
        paddingHorizontal: 15,
        // color: "#8bb2b5",
        // fontWeight: "bold",
        fontSize: scale.normalize(14),
        fontFamily: fonts.FONT_SFPRO_MEDIUM
    },
    middleLabelForDiscover: {
        fontSize: scale.normalize(18),
        // color: scale.changeFontColor("#233746"),
        fontFamily: fonts.FONT_SFPRO_REGULAR,

    },
    middleLabelForVideo: {
        fontSize: scale.normalize(18),
        // color: scale.changeFontColor("#000"),
        fontFamily: fonts.FONT_SFPRO_REGULAR,
        //backgroundColor: 'red'
    },
    lastLabelForVideo: {
        fontSize: scale.normalize(14),
        paddingTop: 5,
        // color: scale.changeFontColor("#000"),
        fontFamily: fonts.FONT_SFPRO_LIGHT,
        //backgroundColor: 'yellow'
    },
    playButton: {
        height: 60,
        width: 60,
        position: "absolute"
    },

    uploadButton: {
        height: 25,
        width: 25,
    },
    pollOptions: {
        aspectRatio: 1.5,
        backgroundColor: "#E7E8E9",
        justifyContent: 'center',
        alignItems: 'center'
    },
    voteText: {
        color: "white",
        fontWeight: "normal",
        fontSize: scale.normalize(16),
        textAlign: "center",
        paddingVertical: 12,
        width: '100%'
    },
    pollOptionsText: {
        fontSize: scale.normalize(14),
        // padding: 10,
        textAlign: "center"
    },
    pollOptionsTextImage: {
        fontSize: scale.normalize(12),
        padding: 10,
        textAlign: "center"
    },
    topLabelForDiscover: {
        paddingTop: 10,
        paddingHorizontal: 15,
        // color: "#97BCBE",
        fontWeight: '500',
        fontSize: scale.normalize(15),
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    lastLabelForDiscover: {
        fontSize: scale.normalize(15),
        paddingTop: 10,
        // color: scale.changeFontColor("#233746"),
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },

    videoContainer: {
        height: 200,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        height: 200,
        width: '100%',
    },

    pollTitle: {
        // color: "#B7B7B7",
        fontSize: scale.normalize(12),
        paddingTop: 15,
        marginBottom: 20
    },

    pollOptionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1
    },
    buttonVote: {
        // backgroundColor: scale.changeButtonColor("#3E4950"),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        width: '50%',

        alignSelf: "center",
        marginTop: 10
    },

});