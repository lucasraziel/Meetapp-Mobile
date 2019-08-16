import React, { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import api from '~/services/api';

import Meetup from '~/components/Meetup';

export default function Subscriptions() {
  const [refresh, setRefresh] = useState(true);

  const [meetups, setMeetups] = useState([]);
  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('subscriptions');

      const mountedMeetups = response.data.map(subscription => {
        subscription.meetup.subscribed = true;
        subscription.meetup.active = true;
        subscription.meetup.subscription_id = subscription.id;
        return subscription.meetup;
      });

      setMeetups(mountedMeetups);
      setRefresh(false);
    }
    loadMeetups();
  }, [refresh]);

  async function handleUnsubscribe(meetup) {
    try {
      await api.delete(`subscriptions/${meetup.subscription_id}`);
      setMeetups(
        meetups.map(meetupElement =>
          meetup.id === meetupElement.id
            ? {
                ...meetupElement,
                active: false,
              }
            : meetupElement
        )
      );
    } catch (error) {
      if (error.data) {
        console.tron.log(error.data);
        Alert.alert(error.data.error.message);
      } else {
        Alert.alert('Ocorreu um erro na requisição');
      }
    }
  }

  async function refreshList() {
    setRefresh(true);
  }

  return (
    <Background>
      <FlatList
        data={meetups}
        keyExtractor={meetup => `${meetup.id}`}
        renderItem={({ item }) => (
          <Meetup data={item} handler={() => handleUnsubscribe(item)} />
        )}
        refreshing={refresh}
        onRefresh={refreshList}
      />
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
