import {
  addContact,
  getAllContacts,
  getContactByID,
  removeContact,
  updateContactByID,
} from "./db/contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await getAllContacts();
      return console.log(allContacts);

    case "get":
      const contactById = await getContactByID(id);
      return console.log(contactById);

    case "add":
      const newContact = await addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);

    case "update":
      const updatedContact = await updateContactByID(id, {
        name,
        email,
        phone,
      });
      return console.log(updatedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
