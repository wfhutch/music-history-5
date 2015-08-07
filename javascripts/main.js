
requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports:'Firebase'
    }
  }
});



requirejs(["jquery", "hbs", "bootstrap", "dom-access","populate-songs","get-more-songs", "new-songs", "filter", "firebase", "lodash"], 
  function($, Handelbars, bootstrap, dom, populate, get, newsongs, filter, _firebase, _) {
  
  var myFirebaseRef = new Firebase("https://flickering-fire-6777.firebaseio.com/");
  myFirebaseRef.child("songs").on("value", function(snapshot) {
  // console.log(snapshot.val());
   
  var songs = snapshot.val();
  // console.log(songs);

  var allSongsArray = [];
  for (var i in songs) {
    allSongsArray[allSongsArray.length] = songs[i];
  }
  // console.log(allSongsArray);

  var allSongsObject = {songs: allSongsArray};
  // console.log(allSongsObject);

  var originalSongsArray = allSongsArray.slice();

  require(['hbs!../templates/songs'], function(songTemplate) {
    dom.html(songTemplate(allSongsObject));
    $(".deleteButton").on("click", function() {
    $(this).closest("div").remove();
    });
  });



var uniqueAlbums = _.chain(allSongsArray)
                    .uniq('album')
                    .pluck('album')
                    .value();
// console.log('uniqueAlbums', uniqueAlbums);

var uniqueArtists = _.chain(allSongsArray)
                    .uniq('artist')
                    .pluck('artist')
                    .value();
// console.log('uniqueArtists', uniqueArtists);

require(['hbs!../templates/artist'], function(artistTemplate) {
  $("#artists").html(artistTemplate({'artists': uniqueArtists}));
  });

require(['hbs!../templates/album'], function(albumTemplate) {
  $("#album").html(albumTemplate({'album': uniqueAlbums}));      
  });





});


  var songsObject = {};

  
  // populate.querySongs(function (songs) {

  //   songsObject = songs;
  //   console.log(songsObject)

  //   require(['hbs!../templates/songs'], function(songTemplate) {
  //     dom.html(songTemplate(songs));
  //     $(".deleteButton").on("click", function() {
  //     $(this).closest("div").remove();
  //     });
  //   });

      // require(['hbs!../templates/artist','hbs!../templates/album'], function(artistTemplate, albumTemplate) {
      // $("#artists").html(artistTemplate(songs));
      // $("#album").html(albumTemplate(songs));      
      // });
  // });

  // $("#filter").click(function(e){
  //   e.preventDefault();
  //   filter.boxId(songsObject);
  // });

});






  //   $("body").on("click", ".moreButton", function() {
  //       $(".moreButton").css("display", "none"); 
      
  //       get.querySongs(function (songs) {
  //       console.log("data", songs);   

  //       require(['hbs!../templates/songs'], function(songTemplate) {
  //       dom.append(songTemplate(songs));
  //       $(".deleteButton").on("click", function() {
  //       $(this).closest("div").remove();
  //       });
  //     });      
  //   });
  // }); 



    // console.log("data", bob);  
    // for (var i = 0; i < bob.length; i++) {
    //   var songData = "";
    //   var currentSong = bob[i];
    //   songData += "<div class='songs'>";
      // songData += "<h2>" + currentSong.name + "<span class='glyphicon glyphicon-music music-notes' aria-hidden='true'></span>" + "</h2>";
    //   songData += "<p class='songinfo'>by " + currentSong.artist;
    //   songData += " on the album " + currentSong.album + "</p>";    
      // songData += "<p><button type='button' class='btn btn-danger btn-xs deleteButton'>Delete</button></p>";
    //   songData += "</div>";
    //   dom.append(songData);
    // }




      // for (var i = 0; i < tom.length; i++) {
      //   var songData = "";
      //   var currentSong = tom[i];
      //   songData += "<div class='songs'>";
      //   songData += "<h2>" + currentSong.name + "<span class='glyphicon glyphicon-music music-notes' aria-hidden='true'></span>" + "</h2>";
      //   // songData += "<h2>" + currentSong.name + "</h2>";
      //   songData += "<p class='songinfo'>by " + currentSong.artist;
      //   songData += " on the album " + currentSong.album;    
      //   songData += "<p><button type='button' class='btn btn-danger btn-xs deleteButton'>Delete</button></p>";
      //   songData += "</div>";
      //   dom.append(songData);
      // }


















  



        



