import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import theme from '../theme';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInForm = ({ onSubmit }) => {
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
          testID='usernameField'
          style={styles.input}
          name='username'
          placeholder='Username'
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          testID='passwordField'
          style={styles.input}
          secureTextEntry={true}
          name='password'
          placeholder='Password'
        />
      </View>

      <TouchableOpacity testID='submitButton' onPress={onSubmit}>
        <View style={styles.buttonContainer}>
          <Text color='textSecondary' fontWeight='bold'>
            Sign in
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const SignInFormContainer = ({ handleSubmit }) => {
  const initialValues = { username: '', password: '' };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log('error when signing in:', e);
    }
  };
  return <SignInFormContainer handleSubmit={onSubmit} />;
};

export default SignIn;
