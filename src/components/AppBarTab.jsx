import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'react-router-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    flexGrow: 0,
    paddingHorizontal: 15,
    paddingVertical: 20,
    color: theme.colors.textSecondary,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/' component={TouchableOpacity} activeOpacity={0.8}>
          <Text style={styles.tab} fontWeight='bold'>
            Repositories
          </Text>
        </Link>

        <Link to='/sign-in' component={TouchableOpacity} activeOpacity={0.8}>
          <Text style={styles.tab} fontWeight='bold'>
            Sign in
          </Text>
        </Link>
       
      </ScrollView>
    </View>
  );
};

export default Main;
