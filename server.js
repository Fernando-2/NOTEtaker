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
    let newNote = req.body;
    // reads existing notes.
    const dbNotes = fs.readFileSync("./db/db.json",);
    // parses the raw data 
    const notes = JSON.parse(dbNotes);
    //makes a new note id for every note made
    newNote.id = notes.length+1 
    console.log(newNote.id);
    // creates array that uses (...) to hold old array data and makes new array.
    const newNotes = [...notes, newNote];//notes.concat(newNote) is what this is doing
    console.log(newNotes);
    // write new data to add to existing file.
    fs.writeFileSync("./db/db.json", JSON.stringify(newNotes));//will need this for delete down below
    res.json(newNotes);
});
app.delete("/api/notes/:id", (req, res) => {
    //gets chosen id when clicked on
    const chosen = req.params.id
    console.log(chosen);
    // read current file
    const dbNotes = fs.readFileSync("./db/db.json");
    // parse raw data
    const newNotes = JSON.parse(dbNotes);

    console.log(newNotes);
    for (var i = 0; i < chosen; i++) {
        // create new array that holds data minus deleted index
        if (newNotes[i].id == id) {
            chosen.readFileSync("./db/db.json");
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(newNotes));
        console.log(newNotes);
    }
    // writes updated data to file eventually
    res.json(newNotes);
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
