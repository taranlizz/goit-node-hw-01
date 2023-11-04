import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const getAllContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

export const getContactByID = async (id) => {
  const contacts = await getAllContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact ?? null;
};

export const addContact = async (data) => {
  const contacts = await getAllContacts();
  const newContact = { ...data, id: nanoid() };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

export const removeContact = async (id) => {
  const contacts = await getAllContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);

  if (idx === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
};

export const updateContactByID = async (id, data) => {
  data.phone = data.phone.toString();
  const contacts = await getAllContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...data };
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};
