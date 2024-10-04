import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DetailsScreen from './DetailScreen';


import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,    
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';


// dummy data
const DATA = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Eve' },
  { id: 6, name: 'Frank' },
  { id: 7, name: 'Grace' },
  { id: 8, name: 'Henry' },
  { id: 9, name: 'Iris' },
  { id: 10, name: 'Jack' },
  { id: 11, name: 'Jhone' },
];
const Tab = createStackNavigator();

const Item = ({ name, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <View style={styles.item}>
      <View style={styles.photoContainer}>
        <Text style={styles.photoText}>Photo</Text>
      </View>
      <Text style={styles.title}>{name}</Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.chatText}>Chats</Text>
        <View style={styles.listData}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Item
                name={item.name}
                onPress={() =>
                  navigation.navigate('Details', { name: item.name })
                }
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Details"
          component={DetailsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 80,
  },
  chatText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  listData: {
    fontSize: 32,
  },
  item: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
    padding: 5,
    marginVertical: 4, 
    marginHorizontal: 8,  
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  photoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  photoText: {
    fontSize: 12,
    color: '#555',
  },
});

export default App;
