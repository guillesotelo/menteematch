import { useState } from 'react';

const useToggleSkills = user => {
  const [learn, setLearn] = useState(user.isMentee);
  const [teach, setTeach] = useState(!user.isMentee);
  const [skillsToRender, setSkillsToRender] = useState(
    learn ? user.skillsToLearn : user.skillsToTeach,
  );

  const handleLearn = () => {
    if (!learn) {
      setLearn(true);
      setTeach(false);
      setSkillsToRender(user.skillsToLearn);
    }
  };
  const handleTeach = () => {
    if (!teach) {
      setTeach(true);
      setLearn(false);
      setSkillsToRender(user.skillsToTeach);
    }
  };

  return { skillsToRender, learn, teach, handleTeach, handleLearn };
};

export default useToggleSkills;
