import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import theme from '../theme';
import Text from './Text';
import useReview from '../hooks/useReview';

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
});

export const ReviewForm = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 15,
    },
    inputContainer: {
      marginBottom: 15,
    },
    input: {
      borderColor: theme.colors.textPrimary,
      borderWidth: 1,
      borderRadius: 3,
      height: 50,
      paddingVertical: 15,
      paddingHorizontal: 10,
    },
    buttonContainer: {
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      flexGrow: 1,
      padding: 17,
      borderRadius: 3,
      height: 50,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name='ownerName'
          placeholder='Repository owner name'
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name='repositoryName'
          placeholder='Repository name'
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name='rating'
          placeholder='Rating between 0 and 100'
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name='text'
          placeholder='Review'
          multiline numberOfLines={3}
        />
      </View>

      <TouchableOpacity testID='submitButton' onPress={onSubmit}>
        <View style={styles.buttonContainer}>
          <Text color='textSecondary' fontWeight='bold'>
            Create a review
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const ReviewFormContainer = ({ handleSubmit }) => {
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const Review = () => {
  const createReview = useReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      await createReview({ ownerName, repositoryName, rating, text });
      history.push('/');
    } catch (e) {
      console.log('error when creating review:', e);
    }
  };
  return <ReviewFormContainer handleSubmit={onSubmit} />;
};

export default Review;
