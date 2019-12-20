import React from 'react';
import {FlatList, ScrollView, View, TextInput, TouchableOpacity} from 'react-native';
import Api from '../assets/Api';

import {Colors} from '../assets/Colors';
import {CommonStyles} from '../assets/CommonStyles';
import {RegularText} from '../assets/StyledText';

export class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            apiKey: 'AIzaSyCm0bkqWAww82ykmQUPpXjuJKnK1nAKBCc',
            searchInput: '',

            searchResults: [],
        };

        this.inputs = {};
    }

    searchBook = term => {
        if (term === null || term === undefined || term === '') {
            return;
        }

        Api.searchBooks(term, this.state.apiKey).then(
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
            <ScrollView>

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
            </View>
        );
    }
}
