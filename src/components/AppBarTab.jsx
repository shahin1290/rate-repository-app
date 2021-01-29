import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useApolloClient } from '@apollo/react-hooks';

import theme from '../theme';
import Text from './Text';
import { useAuthorizedUser } from '../hooks/useAuthorizedUser';
import { useHistory } from 'react-router-native';
import AuthStorageContext from '../contexts/AuthStorageContext';

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

const AppBarTab = () => {
  const { data } = useAuthorizedUser();
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();

  const handleLogOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/signin');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/' component={TouchableOpacity} activeOpacity={0.8}>
          <Text style={styles.tab} fontWeight='bold'>
            Repositories
          </Text>
        </Link>

        {data?.authorizedUser ? (
          <Link
            to='/sign-in'
            component={TouchableOpacity}
            onPress={handleLogOut}
            activeOpacity={0.8}
          >
            <Text style={styles.tab} fontWeight='bold'>
              Sign out
            </Text>
          </Link>
        ) : (
          <Link to='/sign-in' component={TouchableOpacity} activeOpacity={0.8}>
            <Text style={styles.tab} fontWeight='bold'>
              Sign in
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBarTab;
