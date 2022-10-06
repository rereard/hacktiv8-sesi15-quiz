/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const CustomerCard = ({customer}) => (
  <View style={styles.userCard}>
    <Image style={styles.img} source={{
      uri: `${customer.picture.large}`
    }}/>
    <Text style={styles.userName}>{`${customer.name.title} ${customer.name.first} ${customer.name.last}`}</Text>
    <Text>{`${customer.location.street.number} ${customer.location.street.name}, ${customer.location.city}, ${customer.location.state}`}</Text>
    <Text>{customer.email}</Text>
  </View>
)

const App: () => Node = () => {
  const [customers, setCustomers] = useState([])
  const fetchCustomer = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=10')
      const data = await response.json()
      setCustomers([...data.results])
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCustomer()
  }, []);
  useEffect(() => {
    console.log('customers ==', customers);
  }, [customers]);
  const renderItem = ({item}) => {
    return(
      <CustomerCard customer={item}  />
    )
  }
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar />
        <View style={styles.container}>
          <Text style={styles.header}>Customers</Text>
          {customers.length > 0 ? (
            <FlatList 
              data={customers}
              renderItem={renderItem}
              keyExtractor={(item) => item.login.uuid}
              numColumns={2}
              horizontal={false}
              initialNumToRender={6}
            />
          ) : (
            <View>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )}
        </View>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'violet',
    height: '100%'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20
  },
  loadingText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  img: {
    height: 100,
    width: '100%',
  },
  container: {
    padding: 20,
    height: '100%',
    color: 'white',
    marginBottom: 20,
  },
  userCard: {
    backgroundColor: 'aquamarine',
    padding: 5,
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    display: 'flex',
    justifyContent: 'space-between',
    flex:1
  },
  userName:{
   fontSize:17,
   fontWeight: 'bold' 
  },
});

export default App;
