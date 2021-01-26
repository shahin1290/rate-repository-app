import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const SignInForm = ({ onSubmit }) => {
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
          secureTextEntry={true}
          name='password'
          placeholder='Password'
        />
      </View>

      <TouchableOpacity onPress={onSubmit} testID='submitButton'>
        <View style={styles.buttonContainer}>
          <Text color='textSecondary' fontWeight='bold'>
            Sign in
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
