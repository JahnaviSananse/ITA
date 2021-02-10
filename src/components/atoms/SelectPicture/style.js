import { StyleSheet } from 'react-native';
import * as CONSTANTS from '../../../constants/constant';

export default styles = StyleSheet.create({
    container: {
        width: CONSTANTS.SELECTE_PIC_IMAGE,
        height: CONSTANTS.SELECTE_PIC_IMAGE,
        borderRadius: CONSTANTS.SELECTE_PIC_IMAGE / 2,
        backgroundColor: 'lightgray',
        marginBottom: 10
    },
    click: {
        width: '100%', height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeholderImage: { width: '50%', height: '50%' },
    selectedImage: { width: CONSTANTS.SELECTE_PIC_IMAGE, height: CONSTANTS.SELECTE_PIC_IMAGE, borderRadius: CONSTANTS.SELECTE_PIC_IMAGE / 2 }
});
