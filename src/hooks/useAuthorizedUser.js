import { useQuery } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';

export const useAuthorizedUser = () => {
  const response = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });

  return { data: response.data, loading: response.loading };
};
