#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const { addContact, getContact, runFile, updateContact } = require('./logic');

const questions = [
  {
    type : 'input',
    name : 'firstname',
    message : 'Enter firstname ...'
  },
  {
    type : 'input',
    name : 'lastname',
    message : 'Enter lastname ...'
  },
  {
    type : 'input',
    name : 'phone',
    message : 'Enter phone number ...'
  },
  {
    type : 'input',
    name : 'email',
    message : 'Enter email address ...'
  }
];

program
  .version('0.0.1')
  .description('Contact management system');

program
  .command('addContact')//<firstname> <lastname> <phone> <email>
  .alias('a')
  .description('add a contact')
  .action(() =>{
    prompt(questions).then(answer =>{
      addContact(answer)
    })
    // addContact({firstname, lastname, phone, email});
  });

  program
  .command('getContact <name>')
  .alias('f')
  .description('Get contact')
  .action(name => getContact(name));

  // program
  // .command('runTheFile <filename>')
  // .alias('e')
  // .description('file is executing')
  // .action((filename) => runFile(filename));

  program
  .command('updateContact <_id>')
  .alias('u')
  .description('Update contact')
  .action(_id => {
    prompt(questions).then((answers) =>
       updateContact(_id, answers)
      //console.log(answers)
    );
  });
  if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
    program.outputHelp();
    process.exit();
  }
program.parse(process.argv);
