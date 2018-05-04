import React from 'react'
import {View, Text, ListView, Image} from 'react-native'
import {Container, Content, Card, CardItem, Body, Left} from 'native-base';

import Lightbox from 'react-native-lightbox'
import Styles from './styles';

const initialData = [{
    title: 'New delhi',
    image: 'https://static.fabhotels.com/cities/desktop/new-delhi_v1.jpg'
}, {
    title: 'Mumbai',
    image: 'https://static.fabhotels.com/cities/desktop/mumbai_v1.jpg'
}, {
    title: 'Bangalore',
    image: 'https://static.fabhotels.com/cities/desktop/bangalore_v1.jpg'
}, {
    title: 'Gurgaon',
    image: 'https://static.fabhotels.com/cities/desktop/gurgaon_v1.jpg'
}, {
    title: 'Chennai',
    image: 'https://static.fabhotels.com/cities/desktop/chennai_v1.jpg'
}, {
    title: 'Mumbai',
    image: 'https://static.fabhotels.com/cities/desktop/mumbai_v1.jpg'
}, {
    title: 'Goa',
    image: 'https://static.fabhotels.com/cities/desktop/goa_v1.jpg'
}];


class photoScreen extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: 'Home'
    };

    constructor() {
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: initialData,
            dataSource: this.ds.cloneWithRows(initialData),
        };

    }

    componentWillReceiveProps(nextProps) {
        const {navigate} = this.props.navigation;
        if (nextProps.authToken && navigate)
            navigate('Home')
    }

    _renderHeader() {
        return (
            <View style={Styles.headerBackground}>
                <Text style={Styles.header}>Photos</Text>
            </View>
        )
    }


    _renderRow(rowData) {
        return (
            <Content>
                <Card>
                    <CardItem cardBody>
                        <Lightbox>
                            <Image
                                style={Styles.image}
                                source={{uri: rowData.image}}
                            />
                        </Lightbox>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{rowData.title}</Text>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
        )
    }


    _onEndReached() {
        let _self = this;
        setTimeout(() => {
            _self.updateData();
        }, 500)
    }

    updateData() {
        let _self = this;

        let data = initialData.concat(this.state.data);

        if (data.length < 50) {
            _self.setState({
                data: data,
                dataSource: _self.ds.cloneWithRows(data)
            });
        }
    }

    render() {
        return (
            <Container>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    renderHeader={this._renderHeader.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
                    stickySectionHeadersEnabled={true}
                    stickyHeaderIndices={[0]}
                />

            </Container>
        )
    }
}

export default photoScreen
