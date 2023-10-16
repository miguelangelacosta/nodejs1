const yargs = require("yargs");
const contacts = require("./contacts");

yargs
  .command({
    command: "list",
    describe: "List all contacts",
    handler: () => {
      const allContacts = contacts.listContacts();
      console.table(allContacts);
    },
  })
  .command({
    command: "get",
    describe: "Get a contact by ID",
    builder: {
      id: {
        describe: "Contact ID",
        demandOption: true,
        type: "string", // Tipo de dato cambiado a "string"
      },
    },
    handler: (argv) => {
      const contact = contacts.getContactById(argv.id);
      if (contact) {
        console.table([contact]);
      } else {
        console.log("Contact not found.");
      }
    },
  })
  .command({
    command: "add",
    describe: "Add a new contact",
    builder: {
      name: {
        describe: "Contact name",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Contact email",
        demandOption: true,
        type: "string",
      },
      phone: {
        describe: "Contact phone",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      contacts.addContact(argv.name, argv.email, argv.phone);
      console.log("Contact added successfully.");
    },
  })
  .command({
    command: "remove",
    describe: "Remove a contact by ID",
    builder: {
      id: {
        describe: "Contact ID",
        demandOption: true,
        type: "string", // Tipo de dato cambiado a "string"
      },
    },
    handler: (argv) => {
      contacts.removeContact(argv.id);
      console.log("Contact removed successfully.");
    },
  })
  .demandCommand()
  .help().argv;

