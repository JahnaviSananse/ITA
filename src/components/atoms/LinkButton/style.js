import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    },
    mainTitle: {
        marginTop: 10,
        flexDirection: 'row',
        height: 30,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    clickTitle: {
        backgroundColor: 'transparent',
        marginRight: 5,
        position: "absolute",
        // alignSelf: "flex-end",
        // justifyContent: 'center'
    },
    click: {
        color: 'blue'
    }
});
