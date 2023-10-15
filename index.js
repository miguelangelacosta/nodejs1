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
    command: "get <id>",
    describe: "Get a contact by ID",
    builder: {
      id: {
        describe: "Contact ID",
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
    command: "add <name> <email> <phone>",
    describe: "Add a new contact",
    builder: {
      name: {
        describe: "Contact name",
      },
      email: {
        describe: "Contact email",
      },
      phone: {
        describe: "Contact phone",
      },
    },
    handler: (argv) => {
      contacts.addContact(argv.name, argv.email, argv.phone);
      console.log("Contact added successfully.");
    },
  })
  .command({
    command: "remove <id>",
    describe: "Remove a contact by ID",
    builder: {
      id: {
        describe: "Contact ID",
      },
    },
    handler: (argv) => {
      contacts.removeContact(argv.id);
      console.log("Contact removed successfully.");
    },
  })
  .demandCommand()
  .help().argv;
