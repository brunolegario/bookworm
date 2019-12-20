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
            bookSelected: null,
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

    renderFavoriteItem = ({item}) => {
        //console.log(item.volumeInfo);
        const {title, authors, imageLinks} = item.volumeInfo;

        return (
            <TouchableOpacity
                style={CommonStyles.bookContainer}
                onPress={() => this.setState({ bookSelected: item }, () =>  this.setState({ modalDetail: true }))}>
                <View style={CommonStyles.bookImageContainer}>
                    {imageLinks !== undefined &&
                    'smallThumbnail' in imageLinks &&
                    imageLinks.smallThumbnail !== '' ? (
                        <FastImage
                            style={CommonStyles.image}
                            source={{uri: imageLinks.smallThumbnail}}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    ) : (
                        <FastImage
                            style={CommonStyles.image}
                            source={require('../assets/images/not-available.png')}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    )}
                </View>
                <View style={{flex: 1}}>
                    <BoldText>{ShortenString(title, 50)}</BoldText>
                    <LightText>
                        {authors ? ShortenString(authors.join(', '), 50) : null}
                    </LightText>
                </View>
                <View style={CommonStyles.favoriteBox}>

                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={CommonStyles.background}>
                {this.renderFavorites()}
            </View>
        );
    }
}
