var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
var notes = require("./db/db.json");
//Api routes
// app.get("/api/notes", function(req, res) {
  
//     return res.json(data);
//   });
  app.post("/api/notes", function(req, res) {
      var newNote = req.body;
      notes.push(newNote)
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
