/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Api from '../assets/Api';

import FastImage from 'react-native-fast-image';

import {Colors} from '../assets/Colors';
import {CommonStyles, WIDTH, HEIGHT} from '../assets/CommonStyles';
import {BoldText, LightText, RegularText} from '../assets/StyledText';

export class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            apiKey: 'AIzaSyCm0bkqWAww82ykmQUPpXjuJKnK1nAKBCc',
            searchInput: '',
            page: 0,

            searchResults: [],
        };

        this.inputs = {};
    }

    searchBook = term => {
        if (term === null || term === undefined || term === '') {
            return;
        }

        Api.searchBooks(term, this.state.apiKey, this.state.page).then(
            result => {
                console.log('WORKS: ', result);
                this.setState({searchResults: result.data});
            },
            error => {
                console.log('ERROR: ', error);
            },
        );
    };

    renderSearchResults() {
        return (
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={{alignItems: 'center'}}>
                <View style={styles.resultsContainer}>
                    <FlatList
                        data={this.state.searchResults}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        initialNumToRender={10}
                        renderItem={this.renderResultItem}
                        ItemSeparatorComponent={() => {
                            return <View style={styles.separator} />;
                        }}
                        ListEmptyComponent={() => {
                            return (
                                <View style={styles.emptyList}>
                                    <RegularText style={styles.emptyText}>
                                        Sua busca não encontrou resultados! :(
                                    </RegularText>
                                </View>

                            );
                        }}
                    />
                </View>
            </ScrollView>
        );
    }

    renderResultItem = ({item}) => {
        console.log(item.volumeInfo);
        const {title, authors, imageLinks} = item.volumeInfo;

        return (
            <TouchableOpacity style={styles.bookContainer}>
                <View style={styles.bookImageContainer}>
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
                    <BoldText>{title}</BoldText>
                    <LightText>{authors ? authors.join(', ') : null}</LightText>
                </View>
                <View style={styles.favoriteBox}>

                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={CommonStyles.background}>
                <TouchableOpacity style={CommonStyles.textInputContainer}>
                    <RegularText style={CommonStyles.label}>
                        SUA BUSCA
                    </RegularText>
                    <TextInput
                        ref={input => (this.inputs.search = input)}
                        style={CommonStyles.textInput}
                        placeholder={'Digite aqui para buscar...'}
                        placeholderTextColor={Colors.blackTransparent2}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        autoFocus
                        keyboardType={'default'}
                        returnKeyType={'search'}
                        value={this.state.searchInput}
                        onSubmitEditing={() => {
                            this.searchBook(this.state.searchInput);
                        }}
                        onChangeText={text => {
                            return this.setState({searchInput: text});
                        }}
                    />
                </TouchableOpacity>

                {this.renderSearchResults()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        width: WIDTH,
        alignSelf: 'center',
    },
    resultsContainer: {
        width: WIDTH * 0.9,
        paddingBottom: 40,
    },
    separator: {
        width: WIDTH * 0.9,
        height: 1,
        alignSelf: 'center',
        backgroundColor: Colors.blackTransparent2,
        marginVertical: 10,
    },

    emptyList: {
        flex: 1,
        height: HEIGHT * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: Colors.lightGray,
    },

    bookContainer: {
        height: HEIGHT * 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bookImageContainer: {
        width: HEIGHT * 0.1,
        height: '100%',
        marginRight: 10,
    },
    favoriteBox: {
        width: HEIGHT * 0.1,
        height: '100%',
        marginLeft: 10,
    }
});
