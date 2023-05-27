const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');
const contactsPath = path.join(__dirname, 'contacts.json');
console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(`${__dirname}/contacts.json`, 'utf-8');
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  return index || null;
};

function addContact(name, email, phone) {
  // ...твій код
}
module.exports = {
  listContacts,
  getContactById,
};
