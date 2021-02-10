import React from 'react';
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './style';
import * as ICON from '../../../resources'

class SelectPicture extends React.Component {
    constructor(props) {
        super(props);

        this.openImagePickerDialog = this.openImagePickerDialog.bind(this)
    };

    openImagePickerDialog() {
        Alert.alert(
            '',
            'Choose an Image from',
            [
                {
                    text: 'Camera', onPress: () => {
                        ImagePicker.openCamera({
                            width: 200,
                            height: 200,
                            compressImageQuality: 0.5,
                            cropping: true,
                        }).then(image => {
                            const { updatePic } = this.props;
                            updatePic(image.path);
                        }).catch(e => {
                            let code = e.code;
                            if (code === 'E_PICKER_CANCELLED') {

                            } else if (code === 'E_PERMISSION_MISSING') {
                                alert('Kindly give persmission for Camera')
                            }
                        });
                    }
                },
                {
                    text: 'Gallery', onPress: () => {
                        ImagePicker.openPicker({
                            width: 200,
                            height: 200,
                            compressImageQuality: 0.5,
                            cropping: true,
                        }).then(image => {
                            const { updatePic } = this.props;
                            updatePic(image.path);
                        }).catch(e => {
                            // alert(JSON.stringify(e));
                            let code = e.code;
                            if (code === 'E_PICKER_CANCELLED') {

                            } else if (code === 'E_PERMISSION_MISSING') {
                                alert('Kindly give permission for gallery')
                            }
                        });
                    }
                },
                {
                    text: 'Cancel', onPress: () => {

                    }
                },
            ],
            { cancelable: true }
        )
    }

    render() {
        const { currentImage } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.click}
                    onPress={() => {
                        this.openImagePickerDialog()
                    }}
                >
                    {
                        currentImage === '' ?
                            <Image
                                source={ICON.ADD_PIC}
                                style={styles.placeholderImage}
                            />
                            :
                            <Image
                                source={{ uri: currentImage }}
                                style={styles.selectedImage}
                            />
                    }

                </TouchableOpacity>
            </View>
        );
    }

}
export default SelectPicture;