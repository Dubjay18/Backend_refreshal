const fs = require("fs");
const chalk = require("chalk");

function getNotes() {
  return "Your notes...";
}
function addNotes(title, body) {
  const notes = loadNotes();
  const duplicateNote = notes.find(
    (e) => e.title === title
  );
  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green("New Note added!"));
  } else {
    console.log(chalk.red("Note title taken"));
  }
}
function removeNote(title) {
  const notes = loadNotes();
  const noteToBeRemoved = notes.filter(
    (e) => e.title === title
  );
  if (noteToBeRemoved.length !== 0) {
    const newNotes = notes.filter((e) => e.title !== title);

    saveNotes(newNotes);
    console.log(
      chalk.green.bold.underline(
        `Removed the note: ${title}`
      )
    );
  } else {
    console.log(chalk.red("Note not found"));
  }
}
function listNotes() {
  const notes = loadNotes();
  if (notes.length !== 0) {
    notes.forEach((element) => {
      console.log(chalk.blue(element.title));
    });
  } else {
    console.log(chalk.red.inverse("No notes present"));
  }
}
function readNote(title) {
  const notes = loadNotes();
  const noteToRead = notes.filter((e) => e.title === title);
  if (noteToRead.length !== 0) {
    console.log(
      chalk.blue.inverse(noteToRead[0].title),
      chalk.blue(noteToRead[0].body)
    );
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
}
function saveNotes(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
}

function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
}
module.exports = {
  getNotes,
  addNotes,
  removeNote,
  listNotes,
  readNote,
};
