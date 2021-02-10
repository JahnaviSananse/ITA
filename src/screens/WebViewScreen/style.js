import { StyleSheet } from 'react-native';
import * as COLOR from '../../constants/colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.MAIN_BG_COLOR
    },
     loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: COLOR.LOADER_BG
    },
     absouluteloader: {
        position: 'absolute',
        flex: 1,
      
        height: '100%',
        width: '100%',
        
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20
    },
    text: {
        fontSize: 30
    },
    rowContainer: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    icon: {
        marginLeft: 20,
        height: 20,
        width: 20
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingLeft: 15
    },
    saperator: {
        backgroundColor: 'gray',
        height: 0.5,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 10
    },
    cancelButton: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navigationContainer: {
        height: 50,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 20,
        flexDirection: "row"
    },
    back: {
        height: '100%',
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    forward: {
        height: '100%',
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    share: {
        height: '100%',
        width: 50,
        position: "absolute",
        right: 20,
        justifyContent: "center",
        alignItems: "center"
    }
});