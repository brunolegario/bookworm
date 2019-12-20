/* eslint-disable react/no-string-refs */
/* eslint-disable react-native/no-inline-styles */
import React, {Fragment} from 'react';
import {
    FlatList,
    Linking,
    ScrollView,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Api from '../assets/Api';

import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';

import {Colors} from '../assets/Colors';
import {CommonStyles, WIDTH, HEIGHT} from '../assets/CommonStyles';
import {BoldText, LightText, RegularText} from '../assets/StyledText';
import {ShortenString} from '../assets/utils';

export class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            apiKey: 'AIzaSyCm0bkqWAww82ykmQUPpXjuJKnK1nAKBCc',
            searchInput: '',
            page: 0,

            searchResults: [],
            bookSelected: null,
            modalDetail: false,
        };

        this.refs = {};
        this.inputs = {};
    }

    searchBook = term => {
        if (term === null || term === undefined || term === '') {
            return;
        }

        Api.searchBooks(term, this.state.apiKey, this.state.page).then(
            result => {
                //console.log('WORKS: ', result);
                this.setState({searchResults: result.data}, () => {
                    //console.log(this.refs.listResults);
                    if (this.refs.listResults) {
                        this.refs.listResults.scrollToIndex({animated: true, index: 0});
                    }
                });
            },
            error => {
                console.log('ERROR: ', error);
            },
        );
    };

    changePage(num) {
        this.setState({page: num}, () => {
            this.searchBook(this.state.searchInput);
        });
    }

    renderSearchResults() {
        return (
            <ScrollView
                style={CommonStyles.scrollContainer}
                contentContainerStyle={{alignItems: 'center'}}>
                <View style={CommonStyles.resultsContainer}>
                    <FlatList
                        ref={'listResults'}
                        data={this.state.searchResults}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        initialNumToRender={10}
                        renderItem={this.renderResultItem}
                        ItemSeparatorComponent={() => {
                            return <View style={CommonStyles.separator} />;
                        }}
                        ListEmptyComponent={() => {
                            return (
                                <View style={CommonStyles.emptyList}>
                                    <RegularText style={CommonStyles.emptyText}>
                                        Sua busca não encontrou resultados! :(
                                    </RegularText>
                                </View>

                            );
                        }}
                        ListFooterComponent={() => {
                            return this.state.searchResults.length !== 0 ? (
                                <View style={styles.listFooter}>
                                    <TouchableOpacity
                                        style={styles.listFooterItem}
                                        onPress={() => {
                                            if (this.state.page > 0) {
                                                this.changePage(this.state.page-1);
                                            }
                                        }}>
                                        <RegularText
                                            style={
                                                this.state.page > 0
                                                    ? styles.clickable
                                                    : styles.notClickable
                                            }>
                                            &lt; Anteriores
                                        </RegularText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.listFooterItem}
                                        onPress={() => {
                                            if (this.state.searchResults.length === 10) {
                                                this.changePage(this.state.page+1);
                                            }
                                        }}>
                                        <RegularText
                                            style={
                                                this.state.searchResults.length === 10
                                                    ? styles.clickable
                                                    : styles.notClickable
                                            }>
                                            Próximos &gt;
                                        </RegularText>
                                    </TouchableOpacity>
                                </View>
                                ) : null;
                        }}
                    />
                </View>
            </ScrollView>
        );
    }

    renderResultItem = ({item}) => {
        //console.log(item.volumeInfo);
        const {title, authors, imageLinks} = item.volumeInfo;

        return (
            <TouchableOpacity
                style={styles.bookContainer}
                onPress={() => this.setState({ bookSelected: item }, () =>  this.setState({ modalDetail: true }))}>
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
                    <BoldText>{ShortenString(title, 50)}</BoldText>
                    <LightText>
                        {authors ? ShortenString(authors.join(', '), 50) : null}
                    </LightText>
                </View>
                <View style={styles.favoriteBox}>

                </View>
            </TouchableOpacity>
        );
    };

    renderBookDetail() {
        const { title, subtitle, authors, description, categories, pageCount, previewLink, imageLinks } = this.state.bookSelected.volumeInfo;
        console.log(this.state.bookSelected.volumeInfo);
        //console.log(imageLinks);

        return (
            <ScrollView>
                <View style={{ width: '100%', height: '100%', alignItems: 'center', paddingBottom: 30 }}>
                    <View style={{ width: '100%', height: HEIGHT * 0.3 }}>
                        {imageLinks !== undefined &&
                        'thumbnail' in imageLinks &&
                        imageLinks.thumbnail !== '' ? (
                            <FastImage
                                style={CommonStyles.image}
                                source={{uri: imageLinks.thumbnail}}
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
                    <BoldText style={{ marginTop: 20, fontSize: 18, textAlign: 'center', color: Colors.orange }}>
                        {title}
                    </BoldText>

                    {subtitle ? (
                        <LightText style={{ width: '90%', marginTop: 5, fontSize: 12, textAlign: 'center', color: Colors.lightGray }}>
                            {subtitle}
                        </LightText>
                    ) : null}

                    {authors ? (
                        <RegularText style={{ width: '90%', marginTop: 15, fontSize: 14, textAlign: 'center' }}>
                            {authors.join(', ')}
                        </RegularText>
                    ) : null}

                    {description ? (
                        <LightText style={{ width: '90%', marginTop: 20, fontSize: 12, textAlign: 'left' }}>
                            {description}
                        </LightText>
                    ) : null}

                    {categories ? (
                        <View style={{width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 1}}>
                                <BoldText style={{ width: '100%', marginTop: 20, fontSize: 12, textAlign: 'left', color: Colors.orange }}>
                                    CATEGORIAS
                                </BoldText>
                                <LightText style={{ width: '100%', marginTop: 5, fontSize: 14, textAlign: 'left' }}>
                                    {categories.join(', ')}
                                </LightText>
                            </View>
                            <View style={{flex: 1}}>
                                <BoldText style={{ width: '100%', marginTop: 20, fontSize: 12, textAlign: 'right', color: Colors.orange }}>
                                    PÁGINAS
                                </BoldText>
                                <LightText style={{ width: '100%', marginTop: 5, fontSize: 18, textAlign: 'right' }}>
                                    {pageCount}
                                </LightText>
                            </View>
                        </View>
                    ) : null}

                    {previewLink ? (
                        <TouchableOpacity
                            style={{ width: '90%', height: HEIGHT * 0.1, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => Linking.openURL(previewLink)}>
                            <BoldText style={{textAlign: 'center'}}>
                                PREVIEW NO BROWSER
                            </BoldText>
                        </TouchableOpacity>
                    ) : null}
                </View>


            </ScrollView>
        );
    }

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
                            this.changePage(0);
                        }}
                        onChangeText={text => {
                            return this.setState({searchInput: text});
                        }}
                    />
                </TouchableOpacity>

                {this.renderSearchResults()}

                <Modal
                    isVisible={!!this.state.bookSelected}
                    style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
                    onBackdropPress={() => this.setState({ bookSelected: null })}
                    animationIn="bounceIn"
                    animationOut="slideOutDown"
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropTransitionInTiming={500}
                    backdropTransitionOutTiming={500}>
                    <View style={styles.modalContainer}>
                        <View style={[styles.closeButtonModal]}>
                            <TouchableOpacity
                                style={[styles.closeButtonTouchableModal]}
                                onPress={()=> this.setState({bookSelected: null}) } >
                                <FastImage
                                    style={{ width: '50%', height: '50%' }}
                                    source={require('../assets/images/close.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    tintColor={Colors.lightGray}
                                />
                            </TouchableOpacity>
                        </View>
                        {!!this.state.bookSelected ? this.renderBookDetail() : null }
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({





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
    },

    listFooter: {
        width: WIDTH * 0.9,
        height: HEIGHT * 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listFooterItem: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clickable: {
        color: Colors.orange,
    },
    notClickable: {
        color: Colors.lightGray,
    },

    modalContainer: {
        width: WIDTH * 0.8,
        height: HEIGHT * 0.8,
        backgroundColor: Colors.white,
        borderRadius: 10,
    },
    closeButtonModal: {
        width: '100%',
        height: HEIGHT * 0.08,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: '5%',
    },
    closeButtonTouchableModal: {
        width: WIDTH * 0.1,
        height: '60%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});
