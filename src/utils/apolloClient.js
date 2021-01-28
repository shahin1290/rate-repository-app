import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const createApolloClient = () => {
  return new ApolloClient(Constants.manifest.extra);
};

export default createApolloClient;
