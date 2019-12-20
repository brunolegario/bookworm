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
    },
});
