import {StyleSheet, Dimensions} from 'react-native';
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
        height: HEIGHT * 0.9,
        backgroundColor: Colors.white,
        borderWidth: 1,
    },
});
