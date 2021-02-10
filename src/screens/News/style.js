import { StyleSheet } from 'react-native';
import * as fonts from '../../constants/fonts/index';
import * as scale from '../../Utility/util';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
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
    title: {
        paddingTop: 25,
        fontSize: scale.normalize(22),
        color: 'black',
        fontFamily: fonts.FONT_SFPRO_MEDIUM
    },
    videoDetails: {
        paddingHorizontal: 15,
        flex: 1
    },
    description: {
        fontSize: scale.normalize(17),
        marginTop: 5,
        color: 'black',
        fontWeight: '300',
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    updateTitle: {
        fontSize: scale.normalize(11),
        color: "gray",
        paddingTop: 15,
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    underLineImage: {
        marginTop: 15,
        width: '10%',
        height: 4
    },
    placeDescText: {
        fontSize: scale.normalize(14),
        color: "black",
        paddingTop: 15,
        textAlign: 'justify',
        lineHeight: 20,
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    title: {
        paddingTop: 25,
        fontSize: scale.normalize(22),        
        fontWeight: "bold"
    },
    videoDetails: {
        paddingHorizontal: 15,
        flex: 1,
    },
    description: {
        fontSize: scale.normalize(17),        
        marginTop: 5
    },
    updateTitle: {
        fontSize: scale.normalize(11),        
        paddingTop: 15
    },
    underLineImage: {
        marginTop: 7,
        width: '10%',
        height: 4
    },
    placeDescText: {
        fontSize: scale.normalize(14),
        color: scale.changeFontColor("#000000"),
        paddingTop: 15,
        textAlign: 'justify',
        lineHeight: 20,
    }
});
