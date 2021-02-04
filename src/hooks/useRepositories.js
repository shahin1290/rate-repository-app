import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (options, obj) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { ...options, ...obj },
  });

  const handleFetchMore = () => {
    console.log('handleFetchMore ran');

    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        first: 5,
      },

      updateQuery: (previousResult, { fetchMoreResult }) => {
        console.log('see this more result', fetchMoreResult);

        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return { repositories: data ? data.repositories : undefined, loading, fetchMore: handleFetchMore, ...result };
};

export default useRepositories;
