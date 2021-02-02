import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (options) => {


  const response = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { ...options },
  });
  return { data: response.data, loading: response.loading };
};

export default useRepositories;
