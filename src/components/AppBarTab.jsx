import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const styles = StyleSheet.create({
  innerText: {
    color: 'white',
  },
  flexContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

const Main = () => {
  return (
    <View style={styles.flexContainer}>
      <Link to='/' component={TouchableOpacity} activeOpacity={0.8}>
        <Text style={styles.innerText} fontWeight='bold'>
          Repositories
        </Text>
      </Link>

      <Link to='/sign-in' component={TouchableOpacity} activeOpacity={0.8}>
        <Text style={styles.innerText} fontWeight='bold'>
          Sign in
        </Text>
      </Link>
    </View>
  );
};

export default Main;
