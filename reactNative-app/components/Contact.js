import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from './Header';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    feedback: '',
  });
  const [submitted, setSubmitted] = useState(false);


  const API_URL = 'http://192.168.0.197:8080/feedback';

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Submitting form:', formData);

    axios.post(API_URL, formData)
      .then(response => {
        console.log('Response:', response);
        if (response.status === 200) {
          setSubmitted(true);
          Alert.alert('Thank you!', 'Your feedback has been submitted.');
        } else {
          Alert.alert('Submission failed', 'Please try again later.');
        }
      })
      .catch(error => {
        console.error('Error during submission:', error);
        if (error.response) {
          console.log('Server Response:', error.response.data);
          Alert.alert('Error', `Server error: ${error.response.data.message}`);
        } else if (error.request) {
          console.log('Request Error:', error.request);
          Alert.alert('Error', 'No response from server. Please check your network connection.');
        } else {
          console.log('Error Message:', error.message);
          Alert.alert('Error', `Something went wrong: ${error.message}`);
        }
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.contactContainer}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>Hello, what is your opinion?</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholder="Enter your name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email Address:</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={formData.phoneNumber}
            onChangeText={(text) => handleChange('phoneNumber', text)}
            placeholder="Enter your phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Feedback:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.feedback}
            onChangeText={(text) => handleChange('feedback', text)}
            placeholder="Enter your feedback"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {submitted && <Text style={styles.submittedText}>Thank you for your feedback</Text>}
      </View>

      <View style={styles.redBar}>
        <Text style={styles.redBarText}>Thank you for your Feedback. We will work harder to improve even more!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contactContainer: {
    padding: 40,
    backgroundColor: '#800000',
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#800000',
    fontSize: 16,
  },
  submittedText: {
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
  redBar: {
    backgroundColor: '#800000',
    padding: 15,
    marginTop: 50,
  },
  redBarText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Contact;
