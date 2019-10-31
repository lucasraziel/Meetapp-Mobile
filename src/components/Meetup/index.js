import React from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  Title,
  Date,
  DataContainer,
  DateContainer,
  PlaceContainer,
  OrganizerContainer,
  Place,
  Organizer,
  FakeButton,
  FakeButtonLabel,
  SubscribeButton,
} from './styles';

export default function Meetup({ data, handler }) {
  const formatedDate = format(
    parseISO(data.date),
    "dd' de 'MMMM', às 'HH':'mm",
    {
      locale: pt,
    }
  );
  return (
    <Container>
      <Banner source={{ uri: data.file.url }} />
      <DataContainer>
        <Title>{data.title}</Title>
        <DateContainer>
          <Icon name="date-range" color="#999" size={13} />
          <Date>{formatedDate}</Date>
        </DateContainer>
        <PlaceContainer>
          <Icon name="place" color="#999" size={13} />

          <Place>{data.place}</Place>
        </PlaceContainer>
        <OrganizerContainer>
          <Icon name="person" color="#999" size={13} />

          <Organizer>Organizer: {data.user.name}</Organizer>
        </OrganizerContainer>
      </DataContainer>
      {data.active ? (
        <SubscribeButton onPress={handler}>
          {data.subscribed ? 'Cancelar Inscriçao' : 'Realizar Inscrição'}
        </SubscribeButton>
      ) : (
        <FakeButton>
          <FakeButtonLabel>
            {data.subscribed ? 'Cancelar Inscriçao' : 'Realizar Inscrição'}
          </FakeButtonLabel>
        </FakeButton>
      )}
    </Container>
  );
}
