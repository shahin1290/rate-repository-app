import { useMutation, useApolloClient } from '@apollo/client';
import { useContext } from 'react';
import { LOGIN } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username, password },
    });

    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    return result;

  };

  return [signIn, result];
};

export default useSignIn;
