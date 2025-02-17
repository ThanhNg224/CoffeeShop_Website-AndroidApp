import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Header from './Header';
import ProductInfoPopup from './ProductInfoPopup';
import image5 from './images/image5.png';

const HomePage = () => {
  const route = useRoute();
  const { user } = route.params;
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
      <Image source={{ uri: item.img }} style={styles.menuImage} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price} VNĐ</Text>
      <Button title="Details" onPress={() => setSelectedProductId(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Image 
        source={image5} 
        style={styles.image} 
        resizeMode="cover"
      />
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatList}
      />
      {selectedProductId && (
        <ProductInfoPopup
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
      <View style={styles.redBar}>
        <Text style={styles.redBarText}>Welcome, {user.username}!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 230,
  },
  flatList: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  menuImage: {
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
  redBar: {
    backgroundColor: '#B22222',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redBarText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default HomePage;
