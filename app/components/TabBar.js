import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import {getStatusBarHeight} from 'react-native-status-bar-height';

import {BoldText, RegularText} from '../assets/StyledText';
import {Colors} from '../assets/Colors';
import {WIDTH, HEIGHT} from '../assets/CommonStyles';

const TABS = [
    {
        screen: 'Search',
        label: 'BUSCADOR',
    },
    {
        screen: 'Favorites',
        label: 'FAVORITOS',
    },
];

export default class TabBar extends React.Component {
    switchTab(screenName, screenIndex) {
        this.props.navigation.navigate(screenName);
    }

    renderTabButton(item, i, selected) {
        console.log(item);
        console.log(selected);
        return (
            <TouchableWithoutFeedback
                onPress={() => this.switchTab(item.screen, i)}>
                <View
                    style={[
                        styles.tabButton,
                        selected === i
                            ? styles.tabButtonSelected
                            : styles.tabButtonNotSelected,
                    ]}>
                    {selected === i ? (
                        <BoldText style={styles.textSelected}>
                            {item.label}
                        </BoldText>
                    ) : (
                        <RegularText style={styles.textNotSelected}>
                            {item.label}
                        </RegularText>
                    )}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        let currentScreen = this.props.navigation.state.index;

        return (
            <View style={styles.tabContainer}>
                {TABS.map((item, i) => {
                    return this.renderTabButton(item, i, currentScreen);
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        width: WIDTH,
        height: HEIGHT * 0.1,
        marginTop: getStatusBarHeight(),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.lighterGray,
    },
    tabButton: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabButtonSelected: {
        backgroundColor: Colors.white,
    },
    tabButtonNotSelected: {
        backgroundColor: 'transparent',
    },

    textSelected: {
        color: Colors.orange,
    },
    textNotSelected: {
        color: Colors.lightGray,
    },
});
