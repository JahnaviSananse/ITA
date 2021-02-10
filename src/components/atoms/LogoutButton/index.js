import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import * as ICONS from '../../../resources'

// This component will help to render button with title. 
class LogoutButton extends React.Component {
    render() {
        const { onPress, moreStyle } = this.props;

        return (
            <TouchableOpacity
                style={[styles.container, moreStyle]}
                onPress={() => {
                    onPress()
                }}
            >
                <Image
                    style={{ width: '80%', height: '80%' }}
                    source={ICONS.LOGOUT}
                />
            </TouchableOpacity>
        );
    }
}
export default LogoutButton;