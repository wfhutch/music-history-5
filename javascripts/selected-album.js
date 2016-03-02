import * as $ from "jquery";

export default {
    findAlbum: function(album, songs) {
      
      var allAlbumSongs = [];

      for(let i=0; i<songs.songs.length; i++) {
        if (album === songs.songs[i].album) {
          allAlbumSongs.push(songs.songs[i]);
        }
      }

      var allAlbumSongsObject = {songs: allAlbumSongs};

      require(['hbs!../templates/songs'], function(songTemplate) {    
        $("#content").html(songTemplate(allAlbumSongsObject));
        $(".deleteButton").on("click", function() {
        $(this).closest("div").remove();
        }); 
      });     
    }
};