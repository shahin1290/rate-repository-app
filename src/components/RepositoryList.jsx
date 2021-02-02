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
import { Button, Menu, Provider } from 'react-native-paper';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Dropdown = ({ setOptions }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Select an item...</Button>}
      >
        <Menu.Item
          onPress={() =>
            setOptions({
              orderBy: 'CREATED_AT',
              orderDirection: 'DESC',
            })
          }
          title='Latest Repositories'
        />
        <Menu.Item
          onPress={() =>
            setOptions({
              orderBy: 'RATING_AVERAGE',
              orderDirection: 'DESC',
            })
          }
          title='Highest rated Repositories'
        />
        <Menu.Item
          onPress={() =>
            setOptions({
              orderBy: 'RATING_AVERAGE',
              orderDirection: 'ASC',
            })
          }
          title='Lowest rated Repositories'
        />
      </Menu>
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, setOptions }) => {
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <Dropdown setOptions={setOptions} />}
      stickyHeaderIndices={[0]}
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
    <Provider>
      <RepositoryListContainer
        repositories={repositories}
        setOptions={setOptions}
        options={options}
      />
    </Provider>
  );
};

export default RepositoryList;
