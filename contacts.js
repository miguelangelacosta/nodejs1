const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function loadContacts() {
  try {
    const data = fs.readFileSync(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveContacts(contacts) {
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
}

function listContacts() {
  return loadContacts();
}

function getContactById(contactId) {
  const contacts = loadContacts();
  contactId = contactId.toString(); // Convierte el número en una cadena
  return contacts.find((contact) => contact.id === contactId);
}

function removeContact(contactId) {
  const contacts = loadContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  saveContacts(updatedContacts);
}

function addContact(name, email, phone) {
  const contacts = loadContacts();
  const newContact = { id: Date.now().toString(), name, email, phone };
  contacts.push(newContact);
  saveContacts(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
