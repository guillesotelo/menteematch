const countCoincidences = (userSkills, skillsToFind) => {
  const userSkillIDs = userSkills.map((x) => (x._id || x).toString());
  const skillsToFindIDs = skillsToFind.map((x) => (x._id || x).toString());

  return userSkillIDs.reduce((a, c) => a + skillsToFindIDs.includes(c), 0);
};

const orderByCoincidences = (userSkills, matches, skillsToFind) =>
  matches
    .map((match) => ({
      ...match._doc,
      password: null,
      coincidences: countCoincidences(
        userSkills,
        match[skillsToFind].map((x) => x._id)
      ),
    }))
    .sort((a, b) => b.coincidences - a.coincidences);

const menteeResultFilter = (userDis_Likes, matches) => {
  const ids = userDis_Likes.map((x) => x.id);
  return matches.filter(
    (match) => !ids.includes(match.id) 
  );
};

const mentorResultFilter = (userDis_Likes, matches) => {
  const ids = userDis_Likes.map((x) => x.id);
  return matches.filter(
    (match) => !ids.includes(match.id) && match.disponible
  );
};

module.exports = {
  orderByCoincidences,
  menteeResultFilter,
  mentorResultFilter
};
