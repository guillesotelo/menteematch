import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import useMode from '../../hooks/useMode';

const Spiner = ({ mentorSkills, userLogin }) => {
  const getUserSkills = () => {
    if(userLogin.actualRole)
      return userLogin.actualRole === 'Mentor' ? userLogin.skillsToTeach : userLogin.skillsToLearn
    return userLogin.isMentor ? userLogin.skillsToTeach : userLogin.skillsToLearn
  }
  const userSkills = getUserSkills();
  const value = (mentorSkills.coincidences * 100) / userSkills.length;
  const { mode } = useMode();

  return (
    <CircularProgress
      value={value}
      radius={30}
      textColor={mode.text}
      activeStrokeColor={mode.green}
      inActiveStrokeColor={mode.text}
      inActiveStrokeOpacity={0.2}
      valueSuffix={'%'}
      inActiveStrokeWidth={10}
      activeStrokeWidth={10}
    />
  );
};

export default Spiner;
