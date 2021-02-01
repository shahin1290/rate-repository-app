import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useHistory } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => history.push(`/${item.id}`)}>
          <RepositoryItem item={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { data, loading } = useRepositories();

  if (loading) {
    return <Text>Loading repositories</Text>;
  }

  const repositories = data?.repositories;

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
