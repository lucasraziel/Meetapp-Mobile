import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  background: #fff;
  margin: 15px;
  border-radius: 10px;
`;

export const Banner = styled.Image`
  max-width: 100%;
  height: 140px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-bottom: 15px;
`;

export const DataContainer = styled.View`
  display: flex;
  width: 100%;
  align-items: flex-start;
  margin: 15px;
  padding: 0 10px;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const PlaceContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  margin-bottom: 10px;
`;

export const OrganizerContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const Place = styled.Text`
  font-size: 13px;
  color: #999;
  margin-left: 5px;
`;

export const Date = styled.Text`
  font-size: 13px;
  color: #999;
  margin-left: 5px;
`;

export const Organizer = styled.Text`
  font-size: 13px;
  color: #999;
  margin-left: 5px;
`;

export const FakeButton = styled.View`
  background: #999;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
`;

export const FakeButtonLabel = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const SubscribeButton = styled(Button)`
  width: 80%;
`;
