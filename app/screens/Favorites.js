import React from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';

import {Colors} from '../assets/Colors';
import {CommonStyles} from '../assets/CommonStyles';
import {BoldText, LightText, RegularText} from '../assets/StyledText';
import {ShortenString} from '../assets/utils';

export class Favorites extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            favoritesList: [],
        };

    }

    renderFavorites() {
        return (
            <ScrollView
                style={CommonStyles.scrollContainer}
                contentContainerStyle={{alignItems: 'center'}}>
                <View style={CommonStyles.resultsContainer}>
                    <FlatList
                        ref={'listFavorites'}
                        data={this.state.favoritesList}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        initialNumToRender={10}
                        renderItem={this.renderFavoritesItem}
                        ItemSeparatorComponent={() => {
                            return <View style={CommonStyles.separator} />;
                        }}
                        ListEmptyComponent={() => {
                            return (
                                <View style={CommonStyles.emptyList}>
                                    <RegularText style={CommonStyles.emptyText}>
                                        Você não tem nenhum favorito! :(
                                    </RegularText>
                                </View>

                            );
                        }}
                    />
                </View>
            </ScrollView>
        );
    }

    render() {
        return (
            <View style={CommonStyles.background}>
                {this.renderFavorites()}
            </View>
        );
    }
}
