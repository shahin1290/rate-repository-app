import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/queries';

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);

  /* useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('phonenumbers-user-token', token);
    }
  }, [result.data]); // */

  const signIn = ({ username, password }) => {
    mutate({
      variables: { username, password },
    });
  };

  return [signIn, result];
};

export default useSignIn;
