import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import {RegularText} from '../assets/StyledText';
import {WIDTH, HEIGHT} from '../assets/CommonStyles';

export default class TabBar extends React.Component {
    switchTab(screenName, screenIndex) {
        this.props.navigation.navigate(screenName);
    }

    render() {
        return (
            <View style={styles.tabContainer}>
                <TouchableWithoutFeedback
                    onPress={() => this.switchTab('Search', 0)}>
                    <RegularText>BUSCADOR</RegularText>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => this.switchTab('Favorites', 1)}>
                    <RegularText>FAVORITOS</RegularText>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        width: WIDTH,
        height: HEIGHT * 0.1,
    },
});
