
requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports:'Firebase'
    }
  }
});

requirejs(["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-songs", "get-more-songs", "add-songs", "filter", "firebase", "lodash", "selected", "selected-album", "q", "authentication"], 
  function($, Handelbars, bootstrap, dom, populate, getSongs, getMoreSongs, addSongs, filter, _firebase, _, selected, sel_alb, q, auth) {

  var ref = new Firebase("https://flickering-fire-6777.firebaseio.com");

  var authData = ref.getAuth();
      console.log(authData);
  if (authData === null) {
  ref.authWithOAuthPopup("github", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
      auth.setUid(authData.uid);
      require(["core_list"], function() {});
    }
  });
    
  } else {
      auth.setUid(authData.uid);
      require(["core_list"], function() {});
  }
});  
    

  // var songsObject = {};

  
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




