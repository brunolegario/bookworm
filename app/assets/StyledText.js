import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';

export class BoldText extends React.Component {
    render() {
        return (
            <Text {...this.props} style={[this.props.style, styles.fontBold]} />
        );
    }
}

export class LightText extends React.Component {
    render() {
        return (
            <Text
                {...this.props}
                style={[this.props.style, styles.fontLight]}
            />
        );
    }
}

export class RegularText extends React.Component {
    render() {
        return (
            <Text
                {...this.props}
                style={[this.props.style, styles.fontRegular]}
            />
        );
    }
}

const styles = StyleSheet.create({
    fontBold: {
        fontFamily: 'Apercu-Bold',
        fontSize: 16,
    },
    fontLight: {
        fontFamily: 'Apercu-Light',
        fontSize: 16,
    },
    fontRegular: {
        fontFamily: 'Apercu-Regular',
        fontSize: 16,
    },
});
