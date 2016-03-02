

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
      }
      
      if (genreSongs.length === 0) {

          require(['hbs!../templates/songs'], function(songTemplate) {
          $("#content").html(songTemplate(songs));
          $(".deleteButton").on("click", function() {
          $(this).closest("div").remove();
          });
        });
        $('input[type=checkbox]').attr('checked',false);

      } else {

      var genreSongsObject = {songs: genreSongs};

      require(['hbs!../templates/songs'], function(songTemplate) {
        $("#content").html(songTemplate(genreSongsObject));
        $(".deleteButton").on("click", function() {
        $(this).closest("div").remove();
        });
      });
          
        $('input[type=checkbox]').attr('checked',false);
      }  
    },
  };
});

