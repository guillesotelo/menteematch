const skills = [
  { name: "Diseño (UX/VD)" },
  { name: "Back-End" },
  { name: "Front-End" },
  { name: "Testing" },
  { name: "QA" },
  { name: "PHP" },
  { name: "Python" },
  { name: "Leadership" },
  { name: "Full-Stack" },
  { name: "AWS" },
  { name: ".NET" },
  { name: "Tech Support" },
  { name: "Data Analyst" },
  { name: "SalesForce" },
  { name: "Costumer Service" },
  { name: "Executive" },
  { name: "HR" },
  { name: "Dev Op" },
  { name: "Coordinator" },
  { name: "Facilities" },
  { name: "Finances" },
  { name: "Scrum" },
  { name: "Helper" },
  { name: "Business" },
  { name: "Security" },
  { name: "Athentication" },
  { name: "Services" },
];

//Randomnizo el array de skills para generar fakeUsers
const shuffleSkill = (arr) => {
  let skillsArr = [];
  if (!arr) return [""];
  let i = arr.length,
    rand;
  while (0 !== i) {
    rand = Math.floor(Math.random() * i);
    i--;
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  for (let j = 0; j < 15; j++) {
    skillsArr.push(arr[j]._id);
  }
  return skillsArr;
};

module.exports = { skills, shuffleSkill };
