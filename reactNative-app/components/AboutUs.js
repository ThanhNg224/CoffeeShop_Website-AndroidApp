import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from './Header';

const AboutUs = ({ navigation }) => {
  const handleContactUs = () => {
    console.log('Contact Us pressed');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.text}>
          Welcome to our small Coffee Shop! We are not only dedicated to providing high-quality coffee and delicious drinks, but also fantastic fast foods for our customers.
        </Text>
        <Text style={styles.text}>
          Our Coffee Shop was constructed by the united effort of three members, and we take great pride in what we've built.
        </Text>
        <Text style={styles.text}>
          Thank you for choosing our service. We look forward to leaving you an experience you won't be able to forget!
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
            style={styles.contactButton} 
            onPress={() => navigation.navigate('Contact')}
>
        <Text style={styles.contactButtonText}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.redBar}>
        <Text style={styles.redBarText}>
          This is our Detail Page. If there's anything you need to know/ask, feel free!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    infoContainer: {
      padding: 20,
      marginTop: 20,
      flex: 1, // This will make it take up all available space
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    text: {
      fontSize: 16,
      marginBottom: 15,
    },
    buttonContainer: {
      alignItems: 'center',
      marginVertical: 30,
    },
    contactButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#B22222',
      borderRadius: 5,
    },
    contactButtonText: {
      color: '#B22222',
      fontSize: 16,
    },
    redBar: {
      backgroundColor: '#B22222',
      padding: 15,
      // Remove any margin here
    },
    redBarText: {
      color: '#FFFFFF',
      textAlign: 'center',
    },
  });

export default AboutUs;