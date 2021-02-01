
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';

import { CREATE_USER } from '../graphql/mutations';
import useSignIn from './useSignIn';

const useSignUp = () => {
  const signIn = useSignIn();
  const history = useHistory();

  const [mutate] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    if (data) {
      await signIn({ username, password });
      history.push('/');
    }
  };

  return signUp;
};

export default useSignUp; 