requirejs(["dom-access","populate-songs","get-more-songs"], function(dom, populate, get) {
  console.log("dom", dom);

  populate.querySongs(function (bob) {
    console.log("data", bob);  
    for (var i = 0; i < bob.length; i++) {
      var songData = "";
      var currentSong = bob[i];
      songData += "<div class='songs'>";
      songData += "<h2>" + currentSong.name + "</h2>";
      songData += "<p class='songinfo'>by " + currentSong.artist;
      songData += " on the album " + currentSong.album + "</p>";    
      songData += "<p><button type='button' class='deleteButton'>Delete</button></p>";
      songData += "</div>";
      dom.append(songData);
    }
  $("#content").append("<button type='button' class='moreButton'>More</button>");
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
        songData += "<h2>" + currentSong.name + "</h2>";
        songData += "<p class='songinfo'>by " + currentSong.artist;
        songData += " on the album " + currentSong.album;    
        songData += "<p><button type='button' class='deleteButton'>Delete</button></p>";
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
  



        



