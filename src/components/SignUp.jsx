import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import theme from '../theme';
import Text from './Text';
import useSignUp from '../hooks/useSignUp';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username length should be between 1 and 30')
    .max(30, 'Username length should be between 1 and 30'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password length should be between 5 and 50')
    .max(50, 'Password length should be between 5 and 50'),
  passwordConfirm: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Password confirmation does not match the password'
    )
    .required('Password confirm is required'),
});

export const SignUpForm = ({ onSubmit }) => {
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
          name='username'
          placeholder='Username'
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name='password'
          placeholder='Password'
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name='passwordConfirm'
          placeholder='Password confirmation'
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={onSubmit}>
        <View style={styles.buttonContainer}>
          <Text color='textSecondary' fontWeight='bold'>
            Sign up
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const SignUpFormContainer = ({ handleSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const signUp = useSignUp();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password, passwordConfirm } = values;
    try {
      await signUp({ username, password, passwordConfirm });
      history.push('/');
    } catch (e) {
      console.log('error when sign up:', e);
    }
  };
  return <SignUpFormContainer handleSubmit={onSubmit} />;
};

export default SignUp;
