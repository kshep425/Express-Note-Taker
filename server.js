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



// The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.
// Add a note
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;

  // Using a RegEx Pattern to remove spaces from newNote
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();

  console.log(newNote);

  notes.push(newNote);

  res.json(newNote);
});

// Deletes a single note by id, or returns false
app.delete("/api/notes/:id", function(req, res) {
  var chosen = req.params.id;

  console.log(chosen);

  for (var i = 0; i < notes.length; i++) {
    if (chosen === notes[i].id) {
        del_note = "Deleted: " + notes[i]
        notes.splice(i,1)
      return res.send(del_note);
    }
  }

  return res.json(false);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
