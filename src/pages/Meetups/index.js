import React, { useState, useEffect, useMemo } from 'react';
import {
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import api from '~/services/api';

import Meetup from '~/components/Meetup';

import { DateText, DateChooser } from './styles';

export default function Meetups() {
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const formattedDate = useMemo(
    () =>
      format(date, "dd' de 'MMMM'", {
        locale: pt,
      }),
    [date]
  );

  const [meetups, setMeetups] = useState([]);
  useEffect(() => {
    async function loadMeetups() {
      const queryDate = format(date, "yyyy'-'MM'-'dd", { locale: pt });
      const response = await api.get(
        `meetups/available?date=${queryDate}&page=${page}`
      );
      const subscriptions = await api.get('subscriptions');
      response.data.map(meetup => {
        meetup.subscribed = false;
        meetup.active = true;

        if (subscriptions.data) {
          const subscription = subscriptions.data.find(
            subscriptionElement => subscriptionElement.meetup_id === meetup.id
          );
          if (subscription) {
            meetup.active = false;
          }
        }
      });
      if (page === 1) {
        setMeetups(response.data);
      } else {
        setMeetups(meetupsOld => [...meetupsOld, ...response.data]);
      }
      setLoading(false);
      setRefresh(false);
    }
    loadMeetups();
  }, [date, page, refresh]);

  function handleChangeDay(addDay) {
    if (addDay) {
      setDate(dateOld => addDays(dateOld, 1));
    } else {
      setDate(dateOld => subDays(dateOld, 1));
    }
    setRefresh(true);
    setPage(1);
  }

  async function handleEndReached() {
    if (meetups.length > 9) {
      await setPage(pageOld => pageOld + 1);
      await setLoading(true);
    }
  }

  async function handleSubscribe(meetup) {
    try {
      await api.post('subscriptions', meetup);

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
    setPage(1);
    setRefresh(true);
  }

  return (
    <Background>
      <DateChooser>
        <TouchableOpacity onPress={() => handleChangeDay(false)}>
          <Icon name="chevron-left" size={40} color="#fff" />
        </TouchableOpacity>
        <DateText>{formattedDate}</DateText>
        <TouchableOpacity onPress={() => handleChangeDay(true)}>
          <Icon name="chevron-right" size={40} color="#fff" />
        </TouchableOpacity>
      </DateChooser>
      <FlatList
        data={meetups}
        keyExtractor={meetup => `${meetup.id}`}
        renderItem={({ item }) => (
          <Meetup data={item} handler={() => handleSubscribe(item)} />
        )}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator color="#fff" /> : null
        }
        refreshing={refresh}
        onRefresh={refreshList}
        onEndReachedThreshold={0.2}
        onEndReached={handleEndReached}
      />
    </Background>
  );
}

Meetups.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};
