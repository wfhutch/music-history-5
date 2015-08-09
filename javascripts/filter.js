

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
          // console.log([i]);
          // console.log([j]);
          // console.log(songs.songs[j].genre);
          if (boxId[i] === songs.songs[j].genre) {
            genreSongs.push(songs.songs[j]);
          }  
        }
      }

      var genreSongsObject = {songs: genreSongs};
      // console.log(genreSongsObject);

      require(['hbs!../templates/songs'], function(songTemplate) {
        $("#content").html(songTemplate(genreSongsObject));
        $(".deleteButton").on("click", function() {
        $(this).closest("div").remove();
        });
      });
          
        // $("input:checkbox").removeAttr("checked");
        $('input[type=checkbox]').attr('checked',false);


          // console.log(boxId);
          // console.log(songs);
          // console.log(genreSongs);
        


    },
  };
});

