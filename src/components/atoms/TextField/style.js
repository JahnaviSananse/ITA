import { StyleSheet, Platform } from 'react-native';
export default (styles = StyleSheet.create({
    extraPadding: {
        paddingLeft: 5,
        paddingRight: 10,
        paddingTop: Platform.OS === 'ios' ? 5 : 10,
        height: Platform.OS === 'ios' ? 55 : 50,
        width: '90%',
        borderRadius: 5,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        // borderBottomColor: "#293645",
        marginBottom: 5
    },
    placeHolder: {
        // color: 'gray',
        position: 'absolute',
        marginTop: 2,
        fontSize: 12,
        paddingLeft: 5
    }
}));
