import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import * as COLOR from '../../constants/colors';
import styles from './style';

class Loaderview extends React.Component {
   
    render() {
        const { isLoading } = this.props;

        // When loader is not active, no need to return whole view. So return with null
        if (!isLoading) return null;

        return (
            <View style ={styles.absouluteloader}>
                <View
                    pointerEvents={'auto'}
                    style={styles.loader}>
                    <ActivityIndicator
                        size='large'
                        color={COLOR.INDICATOR}
                    />
                </View>
            </View>
        );
    }
}
export default Loaderview;