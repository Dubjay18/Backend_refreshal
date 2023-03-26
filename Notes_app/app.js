const getNotes = require("./notes");
const chalk = require("chalk");
const yargs = require("yargs");

yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("Title" + argv.title, "Body" + argv.body);
  },
});
// remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  handler: function () {
    console.log(chalk.red.underline("Removing the note!"));
  },
});
// list command
yargs.command({
  command: "list",
  describe: "list a note",
  handler: function () {
    console.log(chalk.bgBlue.white("List of notes!"));
  },
});
// read command
yargs.command({
  command: "read",
  describe: "read a note",
  handler: function () {
    console.log(chalk.blue("Reading the note!"));
  },
});

yargs.parse();
