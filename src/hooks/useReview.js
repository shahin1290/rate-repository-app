import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';

import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const history = useHistory();

  const [mutate] = useMutation(CREATE_REVIEW);

  const createReview = async (values) => {
    const { data } = await mutate({
      variables: { ...values, rating: Number(values.rating) },
    });
    history.push(`/${data.createReview.repositoryId}`);
  };

  return createReview;
};

export default useReview;
