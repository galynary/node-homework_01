const contacts = require('./db/contacts');
const {Command} = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();
const invokeAction = async ({action, contactId, name, email, phone}) => {
  switch (action) {
    case 'list':
      const AllContacts = await contacts.listContacts();
      console.log(AllContacts);
      break;
    case 'get':
      const oneContact = await contacts.getContactById(contactId);
      console.log(oneContact);
      break;
    case 'remove':
      const removeContact = await contacts.removeContact(contactId);
      console.log(removeContact);
      break;
    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};
invokeAction(argv);

//invokeAction({action: 'list'});
//invokeAction({action: 'get', contactId: '05olLMgyVQdWRwgKfg5J6'});
//invokeAction({
// action: 'add',
//name: 'Mango',
// email: 'mango@gmail.com',
// phone: '322-22-22',
//});
//invokeAction({action: 'remove', contactId: 'qdggE76Jtbfd9eWJHrssH'});
