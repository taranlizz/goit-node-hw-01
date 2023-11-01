const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const getAllContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactByID = async (id) => {
  const contacts = await getAllContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact ?? null;
};

const addContact = async (data) => {
  const contacts = await getAllContacts();
  const newContact = { ...data, id: nanoid() };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const removeContact = async (id) => {
  const contacts = await getAllContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);

  if (!!~idx) {
    return null;
  }

  const [removedContact] = contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
};

const updateContact = async (id, data) => {
  const contacts = await getAllContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (!!~idx) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], data };
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};
