import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import * as fonts from '../../../constants/fonts/index'
import * as utility from '../../../Utility/util'

// This component will help to render button with title. 
class Button extends React.Component {
    trackMethod(str) {
        let value = `Button: ${str}`
        utility.recordEvent(value)
    }
    render() {
        const { title, onPress, bgColor, txtColor, txtSize, moreStyle, opc, isDisable } = this.props;
        return (

            < TouchableOpacity
                style={[styles.container, { width: '100%', marginTop: 10, backgroundColor: bgColor ? bgColor : utility.changeButtonColor('#293645'), opacity: isDisable === true ? 0.7 : 1 }]}
                onPress={() => {
                    onPress()
                    this.trackMethod("Button pressed")
                }
                }
                disabled={isDisable} >
                <Text style={{ color: 'white', fontSize: txtSize, fontFamily: fonts.FONT_SFPRO_LIGHT }}>{title}</Text>
            </TouchableOpacity>
        );
    }
}
export default Button;