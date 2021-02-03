import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  const handleFetchMore = () => {
    console.log('review handleFectch ran');
    const canFetchMore =
      !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;
    if (!canFetchMore) return;
    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        id,
        after: data.repository.reviews.pageInfo.endCursor,
        first: 5,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        console.log('see this more result', fetchMoreResult);
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };

        return nextResult;
      },
    });
  };
  return { data, loading, fetchMore: handleFetchMore };
};

export default useRepository;
