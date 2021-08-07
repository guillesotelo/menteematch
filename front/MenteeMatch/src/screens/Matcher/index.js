import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { UserBlock } from '../';
import { getMatches, setMatches } from '../../redux/Reducers/matchesReducer';
import { updateUser } from '../../redux/Reducers/UserReducer';
import { simpleMessage } from '../../utils';
import { Button } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import useMode from '../../hooks/useMode';
import {
  sendNotification,
  setMenteeToMentor,
} from '../../services/axiosServices';

export default function Matcher() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const matches = useSelector(state => state.matches);
  const theme = useSelector(state => state.theme);
  const getRoleToFind = () => {
    if (!user.actualRole) {
      return user.isMentor ? 'mentees' : 'mentors';
    }
    return user.actualRole === 'Mentor' ? 'mentees' : 'mentors';
  };
  const roleToFind = getRoleToFind();
  const url = '/api/users/profile';
  const { mode } = useMode();
  const likedRole = roleToFind === 'mentors' ? 'likedMentors' : 'likedMentees';
  const dislikedRole =
    likedRole === 'likedMentees' ? 'dislikedMentees' : 'dislikedMentors';

  // Seed inicial
  useEffect(() => {
    if (!matches.length) {
      dispatch(getMatches({ roleToFind, token: user.token }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getMatches({ roleToFind, token: user.token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.actualRole, user.skillsToLearn, user.skillsToTeach]);

  const handleLike = likedUser => {
    const finalMatch = user[likedRole].find(
      userPrevLiked => userPrevLiked._id === likedUser._id,
    );
    if (finalMatch) {
      if (roleToFind === 'mentees') {
        if (user.mentees.length >= user.maxMentees) {
          return simpleMessage(
            '¡Atención!',
            `Puedes tener hasta ${user.maxMentees} mentees cómo máximo al mismo tiempo`,
            'warning',
          );
        }
        sendNotification(
          {
            receptor: finalMatch._id,
            type: 'solicitud',
          },
          user.token,
        ).then(sended => {
          if (!sended) {
            return dispatch(updateUser({ url, data: {} }));
          }
          simpleMessage(
            'Información',
            `Se ha enviado una invitación a ${finalMatch.name} ${finalMatch.surname}`,
            'info',
          );
          // Notificación a mí mismo
          sendNotification(
            {
              emisor: finalMatch._id,
              receptor: user._id,
              type: 'information',
            },
            user.token,
          );
          const likedMentees = user.likedMentees.filter(
            mentee => mentee._id !== finalMatch._id,
          );
          dispatch(
            updateUser({
              url,
              data: {
                likedMentees,
                dislikedMentees: [...user.dislikedMentees, finalMatch],
              },
            }),
          );
        });
      } else if (roleToFind === 'mentors') {
        return setMenteeToMentor(user._id, finalMatch._id, user.token).then(
          setted => {
            if (!setted) {
              simpleMessage(
                '¡Error!',
                'El usuario ya no está disponible.',
                'danger',
              );
              return dispatch(updateUser({ url, data: {} }));
            }
            sendNotification(
              {
                receptor: finalMatch._id,
                type: 'asignacion',
              },
              user.token,
            );
            // Notificación a mí mismo
            sendNotification(
              {
                emisor: finalMatch._id,
                receptor: user._id,
                type: 'congratulations',
              },
              user.token,
            );
            dispatch(updateUser({ url, data: { mentor: finalMatch._id } }));
            simpleMessage(
              'Información',
              `${finalMatch.name} ${
                finalMatch.surname
              } es tu nuevo ${roleToFind.replace('s', '')}`,
              'info',
            );
          },
        );
      }
    } else if (!finalMatch) {
      const orderedMatches = matches.filter(
        match => match._id !== likedUser._id,
      );
      dispatch(
        updateUser({
          url,
          data: { [likedRole]: [likedUser, ...user[likedRole]] },
        }),
      );
      dispatch(setMatches(orderedMatches));
    }
  };

  const handleDislike = dislikedUser => {
    dispatch(
      updateUser({
        url,
        data: { [dislikedRole]: [...user[dislikedRole], dislikedUser] },
      }),
    );
    const hasLikedThatOne = user[likedRole].find(
      likedUser => likedUser._id === dislikedUser._id,
    );
    if (hasLikedThatOne) {
      const filteredLikes = user[likedRole].filter(
        likedUser => likedUser._id !== dislikedUser._id,
      );
      dispatch(updateUser({ url, data: { [likedRole]: filteredLikes } }));
    }

    const filteredMatches = matches.filter(
      match => match._id !== dislikedUser._id,
    );
    dispatch(setMatches(filteredMatches));
  };

  const handleReloadMatchs = () => {
    dispatch(updateUser({ url, data: { [dislikedRole]: [] } })).then(
      dispatched => dispatch(getMatches({ roleToFind, token: user.token })),
    );
  };

  if (user.actualRole === 'Mentee' && user.mentor) {
    return (
      <View>
        <Text>
          Ya tienes un mentor asignado, puedes encontrarlo en la vista Home
        </Text>
      </View>
    );
  }

  return (
    <>
      {user[likedRole].length > 1 && (
        <>
          <Ionicons
            name="chevron-back"
            color={
              theme !== 'dark' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)'
            }
            size={48}
            style={{
              position: 'absolute',
              zIndex: 1,
              top: '12%',
              left: '-0.5%',
            }}
          />
          <Ionicons
            name="chevron-forward"
            color={
              theme !== 'dark' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)'
            }
            size={48}
            style={{
              position: 'absolute',
              zIndex: 1,
              top: '12.5%',
              right: '-0.5%',
            }}
          />
        </>
      )}
      <Ionicons
        name="chevron-back"
        color={theme !== 'dark' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)'}
        size={48}
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: user[likedRole].length ? '30%' : '54%',
          left: '-0.5%',
        }}
      />
      <Ionicons
        name="chevron-forward"
        color={theme !== 'dark' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)'}
        size={48}
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: user[likedRole].length ? '30%' : '54%',
          right: '-0.5%',
        }}
      />
      {matches.length || user[likedRole].length ? (
        <SafeAreaView style={{ ...styles.container, backgroundColor: mode.bg }}>
          {user[likedRole].length ? (
            <View style={styles.subContainer_1}>
              <FlatList
                horizontal
                contentContainerStyle={{}}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={user[likedRole]}
                keyExtractor={(match, index) => match._id + index}
                renderItem={({ item }) => (
                  <UserBlock
                    enableTooltip={
                      user[likedRole].length === 1 &&
                      !user.mentor?._id &&
                      !user.mentees.length
                    }
                    user={item}
                    userLogin={user}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                    disableButtons={true}
                  />
                )}
              />
            </View>
          ) : null}
          {!user[likedRole].length && <View style={styles.fakeHeight} />}
          {matches.length ? (
            <View style={styles.subContainer}>
              <Text style={{ ...styles.optionsTxt, color: mode.text }}>
                Estas son tus opciones, deslizá a los costados
              </Text>
              <FlatList
                horizontal
                contentContainerStyle={styles.flatContent}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={matches}
                keyExtractor={(match, index) => match._id + index}
                renderItem={({ item }) => (
                  <UserBlock
                    user={item}
                    userLogin={user}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                    disableButtons={false}
                  />
                )}
              />
            </View>
          ) : (
            <View
              style={{ ...styles.reloadMatchsBox, backgroundColor: mode.bg }}>
              <Text style={{ ...styles.reloadMatchsTxt, color: mode.text }}>
                ¡Oh!. Te has quedado sin opciones.
              </Text>
              <Text style={{ ...styles.reloadMatchsTxt, color: mode.text }}>
                ¿Quieres volver a recargar todos los perfiles?
              </Text>
              <Button
                title="Recargar"
                style={styles.reloadMatchsBtn}
                pressFunction={handleReloadMatchs}
              />
            </View>
          )}
        </SafeAreaView>
      ) : user[dislikedRole].length ? (
        <View
          style={{ ...styles.reloadAllDiscardedBox, backgroundColor: mode.bg }}>
          <Text style={{ ...styles.reloadMatchsTxt, color: mode.text }}>
            ¡Oh!. Te has quedado sin opciones.
          </Text>
          <Text style={{ ...styles.reloadMatchsTxt, color: mode.text }}>
            ¿Quieres volver a recargar todos los perfiles?
          </Text>
          <Button
            title="Recargar"
            style={styles.reloadMatchsBtn}
            pressFunction={handleReloadMatchs}
          />
        </View>
      ) : (
        <Text
          style={{
            ...styles.textCargStyle,
            backgroundColor: mode.bg,
            color: mode.text,
          }}>
          Cargando...
        </Text>
      )}
    </>
  );
}
