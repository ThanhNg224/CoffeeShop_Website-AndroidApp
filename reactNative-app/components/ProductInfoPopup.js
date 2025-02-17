import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, Button, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ProductInfoPopup = ({ productId, onClose }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        axios.get(`http://192.168.0.197:8080/menu/${productId}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                setLoading(false);
            });
    }, [productId]);

    const handleOrder = () => {
        axios.post(`http://192.168.0.197:8080/menu/${productId}/order`, {
            userId: 1,
            quantity: quantity
        }).then(response => {
            setOrderSuccess(true);
        }).catch(error => {
            console.error('Error placing order:', error);
        });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>&times;</Text>
                    </TouchableOpacity>
                    {product && (
                        <>
                            <Text style={styles.modalTitle}>{product.name}</Text>
                            <Image source={{ uri: product.img }} style={styles.modalImage} />
                            <Text style={styles.modalPrice}>Price: {product.price} VNĐ</Text>
                            <Text style={styles.modalDescription}>{product.description}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Quantity"
                                keyboardType="number-pad"
                                value={String(quantity)}
                                onChangeText={text => setQuantity(Number(text))}
                            />
                            <Button title="Order" onPress={handleOrder} />
                            {orderSuccess && <Text style={styles.successMessage}>Order placed successfully!</Text>}
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#000'
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    modalImage: {
        width: 100,
        height: 100,
        marginBottom: 10
    },
    modalPrice: {
        fontSize: 18,
        color: '#888',
        marginBottom: 10
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 10
    },
    successMessage: {
        color: 'green',
        marginTop: 10,
    }
});

export default ProductInfoPopup;
