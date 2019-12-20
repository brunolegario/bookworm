import React from 'react';
import {Bookworm} from './app/config';

export default class App extends React.Component {
    componentDidMount() {
        console.disableYellowBox = true;
    }

    render() {
        return <Bookworm />;
    }
}
