import { useMutation, useApolloClient } from '@apollo/client';
import { useContext } from 'react';
import { LOGIN } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    await mutate({
      variables: { username, password },
    });
    const accessToken = result.data.authorize.accessToken;

    await authStorage.setAccessToken(accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
