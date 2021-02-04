import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';

import ReviewItem from './ReviewItem';

import useReviews from '../hooks/useReviews';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewListContainer = ({ reviews, deleteReview }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          username={false}
          deleteReview={deleteReview}
        />
      )}
    />
  );
};

const UserReviews = () => {
  const { reviews, loading, refetch } = useReviews({ includeReviews: true });

  const removeReview = useDeleteReview();

  const deleteReview = (id) => {
    removeReview(id);
    refetch();
  };
  if (loading) return <Text>loading</Text>;

  return <ReviewListContainer reviews={reviews} deleteReview={deleteReview} />;
};

export default UserReviews;
