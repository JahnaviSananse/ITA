import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import * as COLOR from '../../../constants/colors';
import * as utility from '../../../Utility/util';
import styles from './style';

class Loader extends React.Component {
    trackMethod(str) {
        let value = `Loader: ${str}`
        utility.recordEvent(value)
    }
    render() {
        const { isLoading } = this.props;

        // When loader is not active, no need to return whole view. So return with null
        if (!isLoading) return null;

        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={isLoading}
                onRequestClose={() => {
                    //this.onClose()
                }}>
                <View
                    pointerEvents={'auto'}
                    style={styles.loader}
                >
                    {this.trackMethod(`Loading (${isLoading})`)}
                    <ActivityIndicator
                        size='large'
                        color={COLOR.INDICATOR}
                    />
                </View>
            </Modal>
        );
    }
}
export default Loader;