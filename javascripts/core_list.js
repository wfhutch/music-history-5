
define(function(require) {
  var $ = require("jquery");
  var bootstrap = require("bootstrap");
  var Handlebars = require("hbs");
  var auth = require("authentication");
  var addSongs = require("add-songs");
  var dom = require("dom-access");
  var filter = require("filter");
  var selected = require("es6!selected");
  var sel_alb = require("es6!selected-album");
  var selectedArtist = "";
  var selectedAlbum = "";

  var myFirebaseRef = new Firebase("https://flickering-fire-6777.firebaseio.com/");
  console.log(myFirebaseRef);

  var currentUser = auth.getUid();
  myFirebaseRef.child("songs").orderByChild("uid").equalTo(currentUser).on("value", function(snapshot) {

  var songs = snapshot.val();


  var allSongsArray = [];

  // Add the unique key given by Firebase to each song
  for (var key in songs) {
  var songsWithId = songs[key];
  songsWithId.key = key;     
  allSongsArray[allSongsArray.length] = songsWithId;
  }

  console.log("Songs with key ", allSongsArray);

  var allSongsObject = {songs: allSongsArray};

  require(['hbs!../templates/songs'], function(songTemplate) {    //Add list of all songs to home page
    dom.html(songTemplate(allSongsObject));
  });

  $("#new-song").click(function(e) {
  e.preventDefault();
  var addNewSong = addSongs();
  addNewSong
    .then(function(addedSong) {
      console.log("posted to Firebase", addedSong);
      location.reload();
    })
    .fail(function(err) {
      console.log("error", err);
    });
  });

  var uniqueArtists = _.chain(allSongsArray)    //Create list of artists
                      .uniq('artist')
                      .pluck('artist')
                      .value();

  var uniqueAlbums = _.chain(allSongsArray)    //Create list of albums
                    .uniq('album')
                    .pluck('album')
                    .value();

  require(['hbs!../templates/artist'], function(artistTemplate) {    //Populate Artist Select Box
    $("#artists").append(artistTemplate({'artists': uniqueArtists}));
    });

    $("#filter").click(function(e) {    //Call function to list songs by genre on home page  
      e.preventDefault();
      filter.findGenre(allSongsObject);
    });

    $("#artists").change(function() {    //Call function to put all songs by particular aritist on page
      selectedArtist = ($(this).val());
      selected.findArtist(selectedArtist, allSongsObject);
    });

    $("#album").change(function() {     // Call function to put albums in select box
      selectedAlbum = ($(this).val());

      if (selectedAlbum === "All") {
        console.log("all selected");
        console.log(selectedArtist);
        selected.findArtist(selectedArtist, allSongsObject);
      }
      sel_alb.findAlbum(selectedAlbum, allSongsObject);
    });

    $(document).on("click", ".deleteButton", function() {
      var songKey = $(this).attr("id");
      console.log("Key", songKey);
      var songUid = auth.getUid();
      if(songs[key].uid === songUid) {
        var firebaseRef = new Firebase('https://flickering-fire-6777.firebaseio.com/songs/' + songKey);
        firebaseRef.remove();
      }  
    });
  });
});



