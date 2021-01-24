import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  innerText: {
    color: 'white',
  },
});

const Main = () => {
  return (
    <TouchableWithoutFeedback>
      <Text style={styles.innerText} fontWeight='bold'>
        Repositories
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default Main;
