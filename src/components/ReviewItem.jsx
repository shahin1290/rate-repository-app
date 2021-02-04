import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { format } from 'date-fns';
import React from 'react';
import { useHistory } from 'react-router-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 23,
    display: 'flex',
  },
  reviewContainer: {
    padding: 15,	    
    display: 'flex',	   
    flexDirection: 'row',	   
    width: 320,	   
    paddingLeft: 5,
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
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 17,
  },
  viewButton: {
    backgroundColor: '#D6394C',
    color: theme.colors.textSecondary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textSecondary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    fontWeight: 'bold',
  },
});

const ReviewItem = ({ review, username, deleteReview }) => {
  const history = useHistory();

  const handleDeletion = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        { text: 'DELETE', onPress: () => deleteReview(id) },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>

        <View style={styles.textContainer}>
          {username ? (
            <Text fontWeight='bold'>{review.user.username}</Text>
          ) : (
            <Text fontWeight='bold'>{review.repository.fullName}</Text>
          )}
          <Text style={styles.reviewDate}>
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {!username && (
        <View style={styles.buttonsContainer}>
          <TouchableWithoutFeedback>
            <Text
              fontSize='subheading'
              fontWeight='bold'
              style={styles.viewButton}
              onPress={() => history.push(`/${review.repository.id}`)}
            >
              View repository
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Text
              fontSize='subheading'
              fontWeight='bold'
              style={styles.deleteButton}
              onPress={() => handleDeletion(review.id)}
            >
              Delete review
            </Text>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
