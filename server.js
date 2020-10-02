const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Api routes

app.get("/api/notes", (req, res) => {
    //reads db.json
    const dbNotes = fs.readFileSync("./db/db.json");
    const notes = JSON.parse(dbNotes);
    console.log(typeof notes);
    res.json(notes);
});

app.post("/api/notes", function (req, res) {
    // gets the new note data from the req body.
  const newNote = req.body;
  // reads existing notes.
  const dbNotes = fs.readFileSync("./db/db.json",);
  // parses the raw data 
  const notes = JSON.parse(dbNotes);
  // creates array that uses (...) to hold old array data and makes new array.
  const newNotes = [...notes, newNote];
  console.log(newNotes);
  // write new data to add to existing file.
  fs.writeFileSync("./db/db.json", JSON.stringify(newNotes));
  res.json(newNotes);
});
app.delete("/api/notes/:id", (req, res) => {
    
    const deleteNote = req.body;
    // read current file
    const dbNotes = fs.readFileSync("./db/db.json");
    // parse raw data
    const newNotes = JSON.parse(dbNotes);
    
    console.log(newNotes);
    
    // writes updated data to file eventually
    res.json(deletedNotes);
  });
//html routes
app.use(express.static("public"));

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
