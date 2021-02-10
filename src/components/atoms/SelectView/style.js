import { StyleSheet } from 'react-native';
import * as fonts from '../../../constants/fonts/index'

export default styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white'
    },
    text: {
        textAlign: 'center',
        color: '#253647',
        fontFamily: fonts.FONT_SFPRO_LIGHT
    },
});