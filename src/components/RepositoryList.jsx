import React from 'react';
import { useState } from 'react';

import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useHistory } from 'react-router-native';
import RNPickerSelect from 'react-native-picker-select';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


export const Dropdown = ({ setOptions }) => {
  const placeholder = {
    label: 'Sort by',
    color: '#9EA0A4',
  };

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <RNPickerSelect
        placeholder={placeholder}
        onValueChange={(value) => {
          setOptions(JSON.parse(value));
        }}
        items={[
          {
            label: 'Latest Repositories',
            value: JSON.stringify({
              orderBy: 'CREATED_AT',
              orderDirection: 'DESC',
            }),
          },
          {
            label: 'Highest rated Repositories',
            value: JSON.stringify({
              orderBy: 'RATING_AVERAGE',
              orderDirection: 'DESC',
            }),
          },
          {
            label: 'Lowest rated Repositories',
            value: JSON.stringify({
              orderBy: 'RATING_AVERAGE',
              orderDirection: 'ASC',
            }),
          },
        ]}
      />
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  setOptions,
  options,
}) => {
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <Dropdown setOptions={setOptions} options={options} />
      )}
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
  const [options, setOptions] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });

  const { data, loading } = useRepositories(options);

  if (loading) {
    return <Text>Loading repositories</Text>;
  }

  const repositories = data?.repositories;

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOptions={setOptions}
      options={options}
    />
  );
};

export default RepositoryList;
