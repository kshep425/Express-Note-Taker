// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT =  process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
// =============================================================

// GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });


// Displays all notes
//The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.
app.get("/api/notes", function(req, res) {
    return res.sendFile(path.join(__dirname, "db/db.json"));
  });


// Basic route that sends the user first to the AJAX Page, GET `*` - Should return the `index.html` file
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const fs = require("fs")
// The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.
// Add a note
app.post("/api/notes", function(req, res) {
    console.log("+++++++++++++req.body+++++++")
    console.log(req.body)
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
    console.log("+++++++++++++newNote+++++++")
    console.log(newNote)

  // Using a RegEx Pattern to remove spaces from newNote
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newNote.routeName = newNote.id;

  console.log(newNote);
  fs.readFile(path.join(__dirname, "db/db.json"), (err, data) => {
    if (err) throw err;
    console.log(data);
    let notes = JSON.parse(data)
    notes.push(newNote);
    console.log("+++++++++++++notes+++++++++++++")
    console.log(notes)
    fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notes), function(err){
        if (err) throw err;
    })
  });

  res.json(newNote);
});

// Deletes a single note by id, or returns false
app.delete("/api/notes/:id", function(req, res) {
  let chosen = req.params.id;
  console.log(chosen);
  let filepath = path.join(__dirname, "db/db.json")
  console.log(filepath);
    fs.readFile(filepath, "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
        let notes = JSON.parse(data)
        for (let index = 0; index < notes.length; index++) {
            if (notes[index].id === chosen) {
                let del_note = "Deleted: " + notes[index];
                notes.splice(index,1);
                console.log("+++++++++++++notes+++++++++++++");
                console.log(notes);
                fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notes), function(err){
                    if (err) throw err;
                    return res.end();
                });
            }
        }
    })



});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
