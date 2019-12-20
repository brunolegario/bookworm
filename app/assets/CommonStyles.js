import {StyleSheet, Dimensions} from 'react-native';

import {getStatusBarHeight} from 'react-native-status-bar-height';

import {Colors} from './Colors';

export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;

export const CommonStyles = StyleSheet.create({
    button: {
        borderWidth: 1,
        backgroundColor: Colors.lightGray,
    },
    background: {
        width: WIDTH,
        height: HEIGHT * 0.9 - getStatusBarHeight(),
        backgroundColor: Colors.white,
        alignItems: 'center',
    },

    label: {
        width: '100%',
        fontSize: 12,
        color: Colors.black,
        lineHeight: 16,
    },
    textInputContainer: {
        width: WIDTH * 0.9,
        height: HEIGHT * 0.1,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: Colors.orange,
    },
    textInput: {
        fontSize: 16,
        fontFamily: 'Apercu-Regular',
        color: Colors.black,
        flex: 1,
    },
});
