import { StyleSheet } from 'react-native';
import * as CONSTANTS from '../../../constants/constant';
import * as COLOR from '../../../constants/colors';

export default styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: COLOR.LOADER_BG
    }
});
