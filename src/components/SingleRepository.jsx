import { View, FlatList, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import React from 'react';
import * as Linking from 'expo-linking';

import Text from './Text';
import theme from '../theme';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryItem = () => {
  const { id } = useParams();
  const { data, loading, fetchMore } = useRepository(id);

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };

  if (loading) {
    return <Text>Loading repository</Text>;
  }

  const repository = data?.repository;

  const reviewNodes = repository
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ReviewItem review={item} username={true} />}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem item={repository} />
          <TouchableWithoutFeedback
            onPress={() => Linking.openURL(repository.url)}
          >
            <Text testID='language' style={theme.button}>
              Open in Github
            </Text>
          </TouchableWithoutFeedback>
          <ItemSeparator />
        </View>
      )}
    />
  );
};

export default SingleRepositoryItem;
