import { View, TouchableWithoutFeedback } from 'react-native';
import * as Linking from 'expo-linking';
import { useParams } from 'react-router-native';
import React from 'react';
import Text from './Text';
import theme from '../theme';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';

const SingleRepositoryItem = () => {
  const { id } = useParams();
  const { data, loading } = useRepository(id);

  if (loading) {
    return <Text>Loading repository</Text>;
  }

  const repository = data.repository;

  if (data)
    return (
      <View>
        <RepositoryItem item={repository} />
        <TouchableWithoutFeedback onPress={() => Linking.openURL(repository.url)}>
          <Text testID='language' style={theme.button}>
            Open in Github
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  else return null;
};

export default SingleRepositoryItem;
