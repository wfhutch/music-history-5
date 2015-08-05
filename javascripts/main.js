
requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

requirejs(["jquery", "hbs", "bootstrap", "dom-access","populate-songs","get-more-songs"], function($, Handelbars, bootstrap, dom, populate, get) {
  console.log("dom", dom);

  populate.querySongs(function (songs) {

    require(['hbs!../templates/songs'], function(songTemplate) {
      dom.html(songTemplate(songs));
    });
    // console.log("data", bob);  
    // for (var i = 0; i < bob.length; i++) {
    //   var songData = "";
    //   var currentSong = bob[i];
    //   songData += "<div class='songs'>";
    //   songData += "<h2>" + currentSong.name + "<span class='glyphicon glyphicon-music music-notes' aria-hidden='true'></span>" + "</h2>";
    //   songData += "<p class='songinfo'>by " + currentSong.artist;
    //   songData += " on the album " + currentSong.album + "</p>";    
    //   songData += "<p><button type='button' class='btn btn-danger btn-xs deleteButton'>Delete</button></p>";
    //   songData += "</div>";
    //   dom.append(songData);
    // }
  $("#content").append("<button type='button' class='btn btn-primary moreButton btn-sm'>Add More Songs</button>");
  $(".deleteButton").on("click", function() {
    $(this).closest("div").remove();
    });
  });

  get.querySongs(function (tom) {
    console.log("data", tom);   
    $(".moreButton").on("click", function() {
        
      for (var i = 0; i < tom.length; i++) {
        var songData = "";
        var currentSong = tom[i];
        songData += "<div class='songs'>";
        songData += "<h2>" + currentSong.name + "<span class='glyphicon glyphicon-music music-notes' aria-hidden='true'></span>" + "</h2>";
        // songData += "<h2>" + currentSong.name + "</h2>";
        songData += "<p class='songinfo'>by " + currentSong.artist;
        songData += " on the album " + currentSong.album;    
        songData += "<p><button type='button' class='btn btn-danger btn-xs deleteButton'>Delete</button></p>";
        songData += "</div>";
        dom.append(songData);
      }

    $(".deleteButton").on("click", function() {
      $(this).closest("div").remove();
    });

    $(".moreButton").css("display", "none"); 

    });
  });
  });
  



        



