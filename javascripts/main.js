requirejs(["dom-access","populate-songs","get-more-songs"], function(dom, populate, get) {
  console.log("dom", dom);
  populate.querySongs();
  console.log("populate", populate.getSongs());
  get.querySongs();
  console.log("get", get.getSongs());
  

  var songs = populate.getSongs();

    for (var i = 0; i < songs.length; i++) {
      var songData = "";
      var currentSong = songs[i];
      songData += "<div class='songs'>";
      songData += "<h2>" + currentSong.name + "</h2>";
      songData += "<p class='songinfo'>by " + currentSong.artist;
      songData += " on the album " + currentSong.album + "</p>";    
      songData += "<p><button type='button' class='deleteButton'>Delete</button></p>";
      songData += "</div>";
      dom.append(songData);
    }

  $(".deleteButton").on("click", function() {
    $(this).closest("div").remove();
  });
        
  $("#content").append("<button type='button' class='moreButton'>More</button>");

  $(".moreButton").on("click", function() {
      
  var moreSongs = get.getSongs();

    for (var i = 0; i < moreSongs.length; i++) {
      var songData = "";
      var currentSong = moreSongs[i];
      songData += "<div class='songs'>";
      songData += "<h2>" + currentSong.name + "</h2>";
      songData += "<p class='songinfo'>by " + currentSong.artist;
      songData += " on the album " + currentSong.album;    
      songData += "<p><button type='button' class='deleteButton'>Delete</button></p>";
      songData += "</div>";
      dom.append(songData);

      $(".deleteButton").on("click", function() {
        $(this).closest("div").remove();
      })

    }

      $(".moreButton").css("display", "none"); 

    });
});


