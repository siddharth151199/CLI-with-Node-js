const mongoose = require('mongoose');
const assert = require('assert');
// var exec = require('child_process').exec,
//       child;
mongoose.Promise = global.Promise;

 mongoose.connect('mongodb://localhost:27017/contact-manager', { useNewUrlParser: true, useUnifiedTopology: true });//coonect to databse
const db = mongoose.connection;
function toLower(v){
  return v.toLowerCase();
}//function for every value should br a lower

const contactSchema = mongoose.Schema({
  firstname: { type: String, set: toLower },
  lastname: { type: String, set: toLower },
  phone: { type: String, set: toLower },
  email: { type: String, set: toLower },

});//schema
const Contact = mongoose.model('Contact', contactSchema);

const addContact = (contact) => {
  Contact.create(contact , (err) =>{
    assert.equal(null, err);
    console.info('New contact added');
    // db.disconnect();
    db.close();
  })
}//this is for insert data into databse

const getContact = (name) => {
  // Define search criteria. The search here is case-insensitive and inexact.
  const search = new RegExp(name, 'i');
  Contact.find({$or: [{firstname: search }, {lastname: search }]})
  .exec((err, contact) => {
    assert.equal(null, err);
    console.info(contact);
    console.info(`${contact.length} matches`);
    db.close();
  });
};

const runFile = (filename) =>{
  child = exec(`node ${filename}.js`,
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    // console.log('stderr: ' + stderr);
    // exec('.exit');
     process.exit(0);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
};
const updateContact = (_id, contact) =>{
  Contact.update({_id}, contact)
  .exec((err, status) =>{
    assert.equal(null, err);
    console.info('Updated Succesfully');
    db.close();
  })
}

module.exports = {addContact, getContact, runFile, updateContact };
