import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';
import React from 'react';
import Text from './Text';
import theme from '../theme';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.colorWhite,
    paddingVertical: 20,
    paddingHorizontal: 23,
    display: 'flex',
    flexDirection: 'row',
  },
  ratingCircle: {
    borderColor: theme.colors.primary,
    borderWidth: 3,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    fontSize: 25,
    color: theme.colors.primary,
  },
  reviewDate: {
    marginBottom: 10,
  },
  textContainer: { paddingLeft: 18, width: '80%' },
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

  const ReviewItem = ({ review }) => {
    return (
      <View style={styles.container}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text fontWeight='bold'>{review.user.username}</Text>
          <Text style={styles.reviewDate}>
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem item={repository} />
          <ItemSeparator />
        </View>
      )}
    />
  );
};

export default SingleRepositoryItem;
