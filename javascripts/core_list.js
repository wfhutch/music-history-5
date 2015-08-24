
define(function(require) {
  var $ = require("jquery");
  var bootstrap = require("bootstrap");
  var Handlebars = require("hbs");
  var auth = require("authentication");
  var getSongs = require("get-songs");
  var getMoreSongs = require("get-more-songs");
  var dom = require("dom-access");
  var filter = require("filter");
  var selected = require("selected");
  var sel_alb = require("selected-album");
  var selectedArtist = "";
  var selectedAlbum = "";

  var myFirebaseRef = new Firebase("https://flickering-fire-6777.firebaseio.com/");
  console.log(myFirebaseRef);
  // myFirebaseRef.child("songs").on("value", function(snapshot) {

  var currentUser = auth.getUid();
  myFirebaseRef.child("songs").orderByChild("uid").equalTo(currentUser).on("value", function(snapshot) {

  var first_list_of_songs = getSongs();

  var all_songs = [];

  first_list_of_songs
    .then(function(first_songs) {
      for (var i = 0; i < first_songs.songs.length; i++) {
        all_songs.push(first_songs.songs[i]);
      }

      return getMoreSongs();
    })
    .then(function(second_songs) {
      second_songs.songs.forEach(function(song) {
        all_songs.push(song);
      });
    })
    .fail(function(err) {
      console.log("err", err);
    })
    .done(function () {
      // console.log("all_songs", all_songs);
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

  var songs = snapshot.val();

  // console.log(songs);

  var allSongsArray = [];

  // for (var key in songs) {
  //   var songsWithId = songs[key];
  //   songsWithId.key = key;
  //   allsongsArray[allsongsArray.length] = songsWithId;
  // console.log(allSongsArray);
  // }


  for (var i in songs) {
    allSongsArray[allSongsArray.length] = songs[i];
  }

  var allSongsObject = {songs: allSongsArray};
  // console.log(allSongsObject);

  var originalSongsArray = allSongsArray.slice();
  // console.log(originalSongsArray);

  require(['hbs!../templates/songs'], function(songTemplate) {    //Add list of all songs to home page
    dom.html(songTemplate(allSongsObject));
  });

  var uniqueArtists = _.chain(allSongsArray)    //Create list of artists
                      .uniq('artist')
                      .pluck('artist')
                      .value();
  // console.log('uniqueArtists', uniqueArtists);

  var uniqueAlbums = _.chain(allSongsArray)    //Creat list of albums
                    .uniq('album')
                    .pluck('album')
                    .value();
  // console.log('uniqueAlbums', uniqueAlbums);

  require(['hbs!../templates/artist'], function(artistTemplate) {    //Populate Artist Select Box
    $("#artists").append(artistTemplate({'artists': uniqueArtists}));
    });

    $("#filter").click(function(e) {    //Call function to list songs by genre on home page  
      e.preventDefault();
      filter.findGenre(allSongsObject);
    });

    $("#artists").change(function() {    //Call function to put all songs by particular aritist on page
      selectedArtist = ($(this).val());
      // console.log(selectedArtist);
      selected.findArtist(selectedArtist, allSongsObject);
    });

    $("#album").change(function() {     // Call function to put albums in select box
      selectedAlbum = ($(this).val());

      if (selectedAlbum === "All") {
        console.log("all selected");
        console.log(selectedArtist);
        selected.findArtist(selectedArtist, allSongsObject);
      }
      // console.log(selectedAlbum, allSongsObject);
      sel_alb.findAlbum(selectedAlbum, allSongsObject);
    });
  });
});



