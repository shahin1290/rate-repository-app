import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import theme from '../theme';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  logo: {
    width: 66,
    height: 58,
  },
  flexContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  flexContainer2: {
    display: 'flex',
  },
  flexContainer3: {
    flexDirection: 'row',
  },
  flexContainer4: {
    display: 'flex',
    width: '80%',
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingTop: 2,
    padding: 4,
    color: 'white',
    alignSelf: 'flex-start',
    borderRadius: 3,
  },
  separator: {
    paddingBottom: 5,
  },
});

const fixNumber = (num) => (num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num);

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer3}>
        <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.flexContainer4}>
          <Text fontWeight='bold' style={styles.separator}>
            {' '}
            {item.fullName}
          </Text>
          <Text style={styles.separator}> {item.description}</Text>
          <View style={styles.button}>
            <Text style={styles.button}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexContainer1}>
        <View style={styles.flexContainer2}>
          <Text fontWeight='bold' style={styles.separator}>
            {fixNumber(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.flexContainer2}>
          <Text fontWeight='bold' style={styles.separator}>
            {fixNumber(item.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.flexContainer2}>
          <Text fontWeight='bold' style={styles.separator}>
            {fixNumber(item.reviewCount)}
          </Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.flexContainer2}>
          <Text fontWeight='bold' style={styles.separator}>
            {fixNumber(item.ratingAverage)}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
