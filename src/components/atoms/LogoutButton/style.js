import { StyleSheet } from 'react-native';

import * as COLOR from '../../../constants/colors'

export default styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.MAIN_BG_COLOR,
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
