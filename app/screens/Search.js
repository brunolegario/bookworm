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

import {Colors} from '../assets/Colors';
import {CommonStyles, WIDTH} from '../assets/CommonStyles';
import {RegularText} from '../assets/StyledText';

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
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.resultsContainer}>
                    <FlatList
                        data={this.state.searchResults}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        initialNumToRender={10}
                        ItemSeparatorComponent={() => {
                            return <View style={styles.separator} />;
                        }}
                    />
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
        width: WIDTH * 0.9,
        alignSelf: 'center',
        borderWidth: 1,
    },
    resultsContainer: {
        paddingBottom: 40,
    },
    separator: {
        width: WIDTH * 0.8,
        height: 2,
        alignSelf: 'center',
        backgroundColor: Colors.blackTransparent2,
        marginVertical: 20,
    },
});
