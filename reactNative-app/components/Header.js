import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
const navigation = useNavigation();

const handleSignOut = () => {
console.log('Sign out pressed');
};

return (
<View style={styles.header}>
<View style={styles.logoContainer}>
<Image
source={require('./images/logo.png')}
style={styles.logo}
resizeMode="contain"
/>
</View>
<View style={styles.navContainer}>
<TouchableOpacity
style={styles.navItem}
onPress={() => navigation.navigate('Menu')}
>
<Text style={styles.navText}>Menu</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.navItem}
onPress={() => navigation.navigate('AboutUs')}
>
<Text style={styles.navText}>About Us</Text>
</TouchableOpacity>
<TouchableOpacity
       style={styles.signOutButton}
       onPress={handleSignOut}
     >
<Text style={styles.signOutText}>Sign Out</Text>
</TouchableOpacity>
</View>
</View>
);
};

const styles = StyleSheet.create({
header: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
backgroundColor: '#B22222',
paddingVertical: 10,
paddingHorizontal: 20,
},
logoContainer: {
flex: 1,
alignItems: 'center',
},
logo: {
width: 120,
height: 40,
marginRight: 60,
},
navContainer: {
flexDirection: 'row',
alignItems: 'center',
},
navItem: {
marginLeft: 20,
},
navText: {
color: '#FFFFFF',
fontSize: 16,
},
signOutButton: {
marginLeft: 20,
paddingHorizontal: 15,
paddingVertical: 8,
backgroundColor: 'transparent',
borderWidth: 1,
borderColor: '#FFFFFF',
borderRadius: 5,
},
signOutText: {
color: '#FFFFFF',
fontSize: 14,
},
});

export default Header;