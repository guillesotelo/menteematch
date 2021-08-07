const { connection } = require("./db");
const { Users, Skills } = require("./db/models");
const { skills, shuffleSkill } = require("./skillsSeed");

const setupSeed = async () => {
  console.log("SEED STARTING");

  const skillsPromise = await Skills.create(skills);

  const userSeed = [
    {
      name: "Pepe",
      surname: "Scalan",
      email: "elpepe@email.com",
      password: "12345",
      isMentee: true,
      isAdmin: true,
      skillsToLearn: shuffleSkill(skillsPromise),
    },

    {
      name: "Lucy",
      surname: "Loles",
      email: "lucyloles@nosoyxena.com",
      password: "1234",
      isAdmin: true,
      isMentor: true,
      position: "UI/UX Lead Designer",
      skillsToTeach: shuffleSkill(skillsPromise),
    },

    {
      name: "Charly",
      surname: "Garcia",
      email: "user1@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "Full Stack Dev",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/39.jpg",
    },

    {
      name: "Pepe",
      surname: "Mujica",
      email: "user2@user.com",
      password: "1234",
      isMentor: true,
      isAdmin: true,
      position: "Facilities Coordinator",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Uruguay",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/75.jpg",
    },

    {
      name: "Carlitos",
      surname: "Menem",
      email: "user3@user.com",
      password: "1234",
      isMentor: true,
      isAdmin: true,
      position: "Full Stack Dev",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/70.jpg",
    },

    {
      name: "Guillermo",
      surname: "Franccela",
      email: "user4@user.com",
      password: "1234",
      isMentor: true,
      isAdmin: true,
      position: "Software Engineer",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/11.jpg",
    },

    {
      name: "Lionel",
      surname: "Messi",
      email: "user5@user.com",
      password: "1234",
      isMentor: true,
      isAdmin: true,
      position: "Dev Operator",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/12.jpg",
    },

    {
      name: "Daddy",
      surname: "Yankee",
      email: "user6@user.com",
      password: "1234",
      isMentor: true,
      isAdmin: true,
      position: "Software Engineer",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Puerto Rico",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/13.jpg",
    },

    {
      name: "Elon",
      surname: "Musk",
      email: "user7@user.com",
      password: "1234",
      isMentor: true,
      isAdmin: true,
      position: "Facilities Coordinator",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "USA",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/14.jpg",
    },

    {
      name: "Jose Maria",
      surname: "Listorti",
      email: "user8@user.com",
      password: "1234",
      isMentor: true,
      isAdmin: true,
      position: "Full Stack Dev",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/15.jpg",
    },

    {
      name: "Jose",
      surname: "de San Martin",
      email: "user9@user.com",
      password: "1234",
      isMentor: true,
      isAdmin: true,
      position: "Software Engineer",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/16.jpg",
    },

    {
      name: "Marcelo",
      surname: "Tinelli",
      email: "user10@user.com",
      password: "1234",
      isMentor: true,
      isAdmin: true,
      position: "Costumer Service",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/17.jpg",
    },

    {
      name: "Homero J",
      surname: "Simpson",
      email: "user11@user.com",
      password: "1234",
      isMentor: true,
      isAdmin: true,
      position: "Facilities Coordinator",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "USA",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/18.jpg",
    },

    {
      name: "Raul",
      surname: "Portal",
      email: "user12@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "Full Stack Dev",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Mexico",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/19.jpg",
    },

    {
      name: "Pablo",
      surname: "Santos",
      email: "user13@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "Software Engineer",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Perú",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/20.jpg",
    },

    {
      name: "Valentino",
      surname: "Losasso",
      email: "user14@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "UX Leader",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Ecuador",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/21.jpg",
    },

    {
      name: "Mario",
      surname: "Bertoni",
      email: "user15@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "Costumer Service",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Uruguay",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/men/22.jpg",
    },

    {
      name: "Paula",
      surname: "Villarreal",
      email: "user16@user.com",
      password: "1234",
      isAdmin: true,
      isMentor: true,
      position: "Dev Operator",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/11.jpg",
    },

    {
      name: "Agustina",
      surname: "Cherry",
      email: "user17@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "Full Stack Dev",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Chile",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/12.jpg",
    },

    {
      name: "Marge",
      surname: "Simpson",
      email: "user18@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "Software Engineer",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "USA",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/13.jpg",
    },

    {
      name: "Penélope",
      surname: "Cruz",
      email: "user19@user.com",
      password: "1234",
      isMentor: true,
      isAdmin: true,
      position: "UX Leader",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "USA",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/14.jpg",
    },

    {
      name: "Cristina",
      surname: "Kirchner",
      email: "user20@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "Dev Operator",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/15.jpg",
    },

    {
      name: "Gabriela",
      surname: "Sabatini",
      email: "user21@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "Costumer Service",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/16.jpg",
    },
    {
      name: "Paola",
      surname: "Fleitas",
      email: "user22@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "Full Stack Dev",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Brasil",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/17.jpg",
    },

    {
      name: "Florencia",
      surname: "Peña",
      email: "user23@user.com",
      password: "1234",
      isMentor: true,
      isAdmin: true,
      position: "Software Engineer",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Uruguay",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/18.jpg",
    },

    {
      name: "Ivana",
      surname: "Nadal",
      email: "user24@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "Dev Operator",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/19.jpg",
    },

    {
      name: "Francisca",
      surname: "García",
      email: "user266@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "Costumer Service",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/20.jpg",
    },

    {
      name: "Ana María",
      surname: "Fonseca",
      email: "user26@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "Software Engineer",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/21.jpg",
    },

    {
      name: "Daniela",
      surname: "Arrabal",
      email: "user27@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "UX Leader",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Argentina",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/22.jpg",
    },

    {
      name: "Sandra",
      surname: "Rodriguez",
      email: "user28@user.com",
      password: "1234",
      isMentor: true,
      isAdmin: true,
      position: "Dev Operator",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Chile",
      skillsToTeach: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/23.jpg",
    },
    {
      name: "Laura",
      surname: "Pontifica",
      email: "user29@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "Costumer Service",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Italia",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/24.jpg",
    },

    {
      name: "Juliana",
      surname: "Rojas",
      email: "user30@user.com",
      password: "1234",
      isMentee: true,
      isAdmin: true,
      position: "UX Leader",
      phone: 549112675876,
      personalDescription:
        "Researching, designing, implementing, and managing software programs. Testing and evaluating new programs.",
      country: "Mexico",
      skillsToLearn: shuffleSkill(skillsPromise),
      img: "https://randomuser.me/api/portraits/women/25.jpg",
    },
  ];

  return Promise.all(userSeed.map((user) => Users.create(user)));
};

try {
  connection.once("open", () =>
    setupSeed().then(() => {
      console.log("SEED TERMINADO");
      process.exit(0);
    })
  );
} catch (err) {
  console.log("Somethin went wrong on the seed process", err.message);
  process.exit(1);
}
