define(['jquery'], function($) {

  return {
    findAlbum: function(album, songs) {
      
      var allAlbumSongs = [];

      for(i=0; i<songs.songs.length; i++) {
        if (album === songs.songs[i].album) {
          allAlbumSongs.push(songs.songs[i]);
        }
      }

    // console.log(allAlbumSongs);

      var allAlbumSongsObject = {songs: allAlbumSongs};
    // console.log(allAlbumSongsObject);

      require(['hbs!../templates/songs'], function(songTemplate) {    
        $("#content").html(songTemplate(allAlbumSongsObject));
        $(".deleteButton").on("click", function() {
        $(this).closest("div").remove();
        }); 
      });     
    }
  };
});