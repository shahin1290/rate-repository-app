import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/queries';
import authStorage from '../utils/authStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    const { data } = mutate({
      variables: { username, password },
    });

    if (data) {
      const token = data.authorize.accessToken;
      const auth = new authStorage();
      await auth.setAccessToken(token);
    }
  };

  return [signIn, result];
};

export default useSignIn;
