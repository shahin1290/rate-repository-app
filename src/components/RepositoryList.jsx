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
import { Button, Menu, Provider, Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Search = ({ setSearchKeyword, searchKeyword }) => {
  const onChangeSearch = (query) => {
    setSearchKeyword(query);
  };

  return (
    <Searchbar
      placeholder='Search'
      onChangeText={onChangeSearch}
      value={searchKeyword}
    />
  );
};

const Dropdown = ({ setOptions }) => {
  const [visible, setVisible] = useState(false);

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

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;

    return (
      <>
        <Search
          setSearchKeyword={props.setSearchKeyword}
          searchKeyword={props.searchKeyword}
        />
        <Dropdown setOptions={props.setOptions} />
      </>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.repositories}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        stickyHeaderIndices={[0]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => this.props.history.push(`/${item.id}`)}
          >
            <RepositoryItem item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

const RepositoryList = () => {
  const [options, setOptions] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchDebounce] = useDebounce(searchKeyword, 500);

  const history = useHistory();

  const { data, loading } = useRepositories(options, {
    searchKeyword: searchDebounce,
  });

  if (loading) {
    return <Text>Loading repositories</Text>;
  }

  const repositories = data?.repositories;

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <Provider>
      <RepositoryListContainer
        repositories={repositoryNodes}
        setOptions={setOptions}
        setSearchKeyword={setSearchKeyword}
        searchKeyword={searchKeyword}
        history={history}
      />
    </Provider>
  );
};

export default RepositoryList;
