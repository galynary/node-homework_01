const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');
console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(`${__dirname}/contacts.json`, 'utf-8');
  const contacts = JSON.parse(data);
  console.table(contacts);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  console.table(result);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.table(result);
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.table(newContact);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
