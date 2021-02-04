import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';

import ReviewItem from './ReviewItem';

import useReviews from '../hooks/useReviews';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewListContainer = ({ reviews }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <ReviewItem review={item} username={false} />}
    />
  );
};

const UserReviews = () => {
  const { reviews, loading } = useReviews({ includeReviews: true });
  if (loading) return <Text>loading</Text>;

  return <ReviewListContainer reviews={reviews} />;
};

export default UserReviews;
