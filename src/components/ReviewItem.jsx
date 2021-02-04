import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import React from 'react';

import Text from './Text';
import theme from '../theme';

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

const ReviewItem = ({ review, username }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>

      <View style={styles.textContainer}>
      {username
          ? <Text fontWeight='bold'>{review.user.username}</Text>
          : <Text fontWeight='bold'>{review.repository.fullName}</Text>
        }
        <Text style={styles.reviewDate}>
          {format(new Date(review.createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
