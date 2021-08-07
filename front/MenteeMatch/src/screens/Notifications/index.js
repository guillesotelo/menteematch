import React, { useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import useMode from '../../hooks/useMode';
import { Information, Solicitud } from './Types';

import styles from './styles';
import { Button } from '../../components';

import { updateUser } from '../../redux/Reducers/UserReducer';

const Notifications = () => {
  const { mode } = useMode();
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  const url = '/api/users/profile';

  useEffect(() => {
    dispatch(updateUser({ url, data: {} }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRenderItem = ({ item }) => {
    if (item.type === 'solicitud') {
      return <Solicitud item={item} />;
    } else {
      return <Information item={item} />;
    }
  };

  const handleReloadNotifications = () => {
    dispatch(updateUser({ url, data: {} }));
  };

  return !user.notifications.length ? (
    <View style={{...styles.buttonContainer, backgroundColor: mode.bg}}>
      <Text
        style={{
          flex: 0.889,
          textAlign: "center",
          textAlignVertical: "center",
          fontSize: 28,
          color: mode.text
        }}>
        No tienes notificaciones actualmente.
      </Text>
      <Button
        title="Recargar"
        pressFunction={handleReloadNotifications}
        style={styles.button}
      />
  </View>
  ) : (
    <View style={{ ...styles.mainContainer, backgroundColor: mode.bg }}>
      <View style={styles.flatListContainer}>
        <FlatList
          numColumns={1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={user.notifications}
          keyExtractor={not => not._id}
          renderItem={handleRenderItem}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Recargar"
          pressFunction={handleReloadNotifications}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default Notifications;
