import React, { useLayoutEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

const PlaceListScreen = ({ navigation }) => {
    const places = useSelector(state => state.places.places);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Nueva"
                        iconName="md-add"
                        onPress={() => navigation.push('Nuevo')}
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    const renderItem = data => (
        <PlaceItem
            image={data.item.image}
            address={null}
            title={data.item.title}
            onSelect={() => navigation.push('Detalle')}
        />
    )

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaceListScreen
