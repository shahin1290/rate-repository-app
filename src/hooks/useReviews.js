import { useQuery } from '@apollo/react-hooks';

import { AUTHORIZED_USER } from '../graphql/queries';

const useReviews = (variables) => {
  const { data, loading, refetch } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return {
    reviews: data ? data.authorizedUser.reviews : undefined,
    loading,
    refetch
  };
};

export default useReviews;
