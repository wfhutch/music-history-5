

define(['jquery'], function($) {
    
    return {
      findGenre: function(songs) {
    
      var el = document.getElementById("checkboxes");
      var boxes =el.getElementsByTagName("input");
      var boxId = [];
      var genreSongs = [];
      
      for (i=0; i<boxes.length; i++) {
        if (boxes[i].checked) {

          boxId.push(boxes[i].value);
        }
      }

      for (i=0; i<boxId.length; i++) {
        for(j=0; j<songs.songs.length; j++) {
          if (boxId[i] === songs.songs[j].genre) {
            genreSongs.push(songs.songs[j]);
          } 
        }
        console.log("genreSongs", genreSongs);
      }
      
      //Notify user if no songs matching that genre are found
      if (genreSongs.length === 0) {
        $("#content").html("<h1>No songs found for that genre.</h1>");
        $('input[type=checkbox]').attr('checked',false);
      } else {
          var genreSongsObject = {songs: genreSongs};
          require(['hbs!../templates/songs'], function(songTemplate) {
          $("#content").html(songTemplate(genreSongsObject));
        });
          
        $('input[type=checkbox]').attr('checked',false);
      }  
    },
  };
});

