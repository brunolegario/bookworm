import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import * as Screens from '../screens';
import TabBar from '../components/TabBar';

const TabNavigator = createMaterialTopTabNavigator(
    {
        Search: Screens.Search,
        Favorites: Screens.Favorites,
    },
    {
        initialRouteName: 'Search',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        navigationOptions: {
            header: null,
        },
        tabBarComponent: navigation => (
            <TabBar navigation={navigation.navigation} />
        ),
    },
);

export const Bookworm = createAppContainer(TabNavigator);
