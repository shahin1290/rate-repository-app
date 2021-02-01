import { useMutation, useApolloClient } from '@apollo/client';
import { useContext } from 'react';
import { LOGIN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username, password },
    });

    const accessToken = data.authorize.accessToken;
    await authStorage.setAccessToken(accessToken);
    apolloClient.resetStore();
    return result;
  };

  return signIn;
};

export default useSignIn;
