import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';

class LinkButton extends React.Component {
    render() {
        const { title, clickableTitle, onPress } = this.props;
        return (
            <View style={styles.mainTitle}>
                <Text>{title}</Text>
                <TouchableOpacity
                    style={styles.clickTitle}
                    onPress={() => {
                        onPress()
                    }}>
                    <Text style={styles.click}>{clickableTitle}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}
export default LinkButton;