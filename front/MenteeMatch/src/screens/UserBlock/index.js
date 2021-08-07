import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import { styles } from './styles';
import user_img from '../../assets/static/user_img.png';
import SpinnerCoincidence from '../../components/SpinnerCoincidence';
import useMode from '../../hooks/useMode';
import useAlert from '../../hooks/useAlert';
import { simpleMessage } from '../../utils';
import { ToolTipModal } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setEnableInctructions } from '../../redux/Reducers/instructionsReducer';

export default function UserBlock({
  user,
  userLogin,
  handleLike,
  enableTooltip,
  handleDislike,
  disableButtons,
}) {
  const dispatch = useDispatch();
  const getIsMentor = () => {
    if (userLogin.actualRole) {
      return userLogin.actualRole === 'Mentor';
    }
    return !!userLogin.isMentor;
  };
  const isMentor = getIsMentor();
  const skills = isMentor ? user.skillsToLearn : user.skillsToTeach;
  const [show, setShow] = useState(false);
  const [tooltipShow, tooltipClose, tooltipOpen] = useAlert();
  const { enableInstructions } = useSelector(state => state);

  const getPopMessage = () => {
    return user.isMentor
      ? `¿Quieres confirmar a ${user.name} ${user.surname} cómo tu mentor?`
      : `¿Quieres invitar a ${user.name} ${user.surname} a ser tu mentee?`;
  };

  const getIsConfirmButtonEnabled = () => {
    if (isMentor) {
      return !user.mentor;
    } else {
      return user.mentees.length < user.maxMentees;
    }
  };

  const isConfirmButtonEnabled = getIsConfirmButtonEnabled();

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleNotElegible = () => {
    return simpleMessage(
      '¡Error!',
      'Este usuario ya no está disponible.',
      'danger',
    );
  };

  useEffect(() => {
    if (enableTooltip && enableInstructions) {
      tooltipOpen();
      dispatch(setEnableInctructions());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableTooltip]);

  const { mode } = useMode();
  return (
    <View style={styles.container}>
      <ToolTipModal visible={tooltipShow} handleClose={tooltipClose} />
      {user._id ? (
        <View
          style={{
            ...styles.block,
            backgroundColor: mode.inputBg,
            borderColor: mode.inputBg,
          }}>
          <View style={styles.rowDirection}>
            <Image
              style={{ ...styles.img, borderColor: mode.violet }}
              source={user.img ? { uri: user.img } : user_img}
            />
            <View style={styles.cardTitleBox}>
              <View>
                <Text
                  style={{
                    ...styles.title,
                    color: mode.violet,
                  }}>
                  {user.name} {user.surname}
                </Text>
                <Text style={{ ...styles.text, color: mode.text }}>
                  {user.email}
                </Text>
              </View>
            </View>
            {disableButtons && (
              <>
                <Button
                  buttonStyle={[
                    styles.likeButton,
                    isConfirmButtonEnabled
                      ? styles.confirmButton
                      : styles.notElegible,
                  ]}
                  title={isConfirmButtonEnabled ? '✔' : 'X'}
                  onPress={
                    isConfirmButtonEnabled ? handleOpen : handleNotElegible
                  }
                />
                <SCLAlert
                  show={show}
                  onRequestClose={handleClose}
                  useNativeDriver={true}
                  theme="success"
                  title="¡Perfecto!"
                  titleStyle={{
                    color: mode.text,
                  }}
                  subtitleStyle={{
                    color: mode.text,
                  }}
                  innerStyle={{
                    backgroundColor: mode.bg,
                  }}
                  headerContainerStyles={{
                    backgroundColor: mode.bg,
                  }}
                  subtitle={getPopMessage()}>
                  <SCLAlertButton
                    theme="info"
                    onPress={() => {
                      handleLike(user);
                      handleClose();
                    }}>
                    Confirmar
                  </SCLAlertButton>
                  <SCLAlertButton theme="default" onPress={handleClose}>
                    Cancelar
                  </SCLAlertButton>
                </SCLAlert>
              </>
            )}
          </View>

          <View style={styles.skillsContainer}>
            <Text style={{ ...styles.skills, color: mode.text }}>
              •
              {skills.map(skill => (
                <Text key={skill._id ? skill._id : skill}> {skill.name} •</Text>
              ))}
            </Text>
          </View>

          {!disableButtons && (
            <View style={styles.buttonsContainer}>
              <Button
                buttonStyle={styles.dislikeButton}
                title="Descartar"
                onPress={() => handleDislike(user)}
              />

              <View style={styles.spinnerContainer}>
                <SpinnerCoincidence mentorSkills={user} userLogin={userLogin} />
                <Text style={{ color: mode.text }}>Coincidencias</Text>
              </View>

              <Button
                buttonStyle={styles.likeButton}
                title="Elegir"
                onPress={() => handleLike(user)}
              />
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
}
