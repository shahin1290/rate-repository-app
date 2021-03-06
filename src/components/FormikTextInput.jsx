import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
  errorInput: {
    borderColor: theme.colors.danger,
  },
});

const FormikTextInput = ({ name, style, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const inputStyles = [style, meta.error && styles.errorInput];

  return (
    <>
      <TextInput
        style={inputStyles}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        {...props}
      />
      {showError && (
        <Text style={styles.errorText} color='error'>
          {meta.error}
        </Text>
      )}
    </>
  );
};

export default FormikTextInput;
