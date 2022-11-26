

const Manager = require('./lib/Manager');
const engineer = require('./lib/engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const render = require('./src/page-template.js');

const teamMembers = [];
const idArray = [];

// Inform user of usage
console.log(
  '\nWelcome to the team generator!\nUse `npm run reset` to reset the dist/ folder\n'
);

function addManager() {
  console.log('Please build your team 👥');
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'managerName',
        message: "What is the team manager's name?",
        validate: (answer) => {
          if (answer !== '') {
            return true;
          }
            return 'Please enter at least one character.';
          },
       },
       {
          type: 'input',
          name: 'managerId',
          message: "What is the team manager's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'managerEmail',
          message: "What is the team manager's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Please enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'managerOffice',
          message: "What is the team manager's office number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
      ])
      .then((answers) => {
         let manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOffice
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
    .prompt ([
      {
        type: 'list',
        name: 'memberChoice',
        message: 'Which type of team member would you like to add?',
        choices: ['engineer', 'intern', 'I do not want to add any more team members']
      }
    ])
    .then(userChoice => {
      if (userChoice.memberChoice === 'engineer') {
          addEngineer();
        } else if (userChoice.memberChoice === 'intern') {
          addIntern();
        } else {
          buildTeam();
        }})
  }

  function addEngineer() {
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'engineerName',
        message: "What is the team engineer's name?",
        validate: (answer) => {
          if (answer !== '') {
            return true;
          }
          return 'Please enter at least one character.';
        },
      },
      {
        type: 'input',
        name: 'engineerId',
        message: "What is the team engineer's id?",
        validate: (answer) => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return 'Please enter a positive number greater than zero.';
        },
      },
      {
        type: 'input',
        name: 'engineerEmail',
        message: "What is the team engineer's email?",
        validate: (answer) => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return 'Please enter a valid email address.';
        },
      },
      {
        type: 'input',
        name: 'gitHubaccount',
        message: "What is the team engineer's gitHub account?",
        validate: (answer) => {
          if (answer !== '') {
            return true;
          }
          return 'Please enter a valid gitHub account.';
        },
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.engineerName,
        answers.engineerId,
        answers.engineerEmail,
        answers.gitHubaccount,
      );
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
      createTeam();
    });
  }
  function createTeam() {
    inquirer
    .prompt ([
      {
        type: 'list',
        name: 'memberChoice',
        message: 'Which type of team member would you like to add?',
        choices: ['manager', 'intern','I do not want to add any more team members']
      }
    ])
    .then(userChoice => {
      if (userChoice.memberChoice === 'manager') {
        addManager();}
        else if (userChoice.memberChoice === 'Intern') {
          addIntern();
        } else {
          buildTeam();
        }})
  }

  function addIntern() {
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'InternName',
        message: "What is the team Intern's name?",
        validate: (answer) => {
          if (answer !== '') {
            return true;
          }
          return 'Please enter at least one character.';
        },
      },
      {
        type: 'input',
        name: 'InternId',
        message: "What is the team Intern's id?",
        validate: (answer) => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return 'Please enter a positive number greater than zero.';
        },
      },
      {
        type: 'input',
        name: 'InternEmail',
        message: "What is the team Intern's email?",
        validate: (answer) => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return 'Please enter a valid email address.';
        },
      },
      {
        type: 'input',
        name: 'InternSchool',
        message: "What is the team Intern's school?",
        validate: (answer) => {
          if (answer !== '') {
            return true;
          }
          return 'Please enter a valid school name.';
        },
      },
    ])
    .then((answers) => {
      const Intern = new Intern(
        answers.InternName,
        answers.InternId,
        answers.InternEmail,
        answers.InternSchool,
      );
      teamMembers.push(Intern);
      idArray.push(answers.InternId);
      createTeam();
    });
  }
  function createTeam() {
    inquirer
    .prompt ([
      {
        type: 'list',
        name: 'memberChoice',
        message: 'Which type of team member would you like to add?',
        choices: ['engineer', 'manager','I do not want to add any more team members']
      }
    ])
    .then(userChoice => {
      if (userChoice.memberChoice === 'engineer') {
        addEngineer();}
        else if (userChoice.memberChoice === 'manager') {
          addManager();
        } else {
          buildTeam();
        }})
      }        

  function buildTeam() {
    // Create the output directory if the dist path doesn't exist
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
    }
  
  // addManager()
  // addIntern();
  // addEngineer();

function appMenu() {
  addManager()
}
appMenu()
