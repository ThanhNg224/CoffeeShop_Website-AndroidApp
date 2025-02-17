import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';
import axios from 'axios';
import ProductInfoPopup from './ProductInfoPopup';

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {
        axios.get('http://192.168.0.197:8080/menu')
            .then(response => {
                setMenuItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching menu items:', error);
            });
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.img }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price} VNĐ</Text>
            <Button title="Details" onPress={() => setSelectedProductId(item.id)} />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={menuItems}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            {selectedProductId && (
                <ProductInfoPopup
                    productId={selectedProductId}
                    onClose={() => setSelectedProductId(null)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
});

export default MenuPage;
