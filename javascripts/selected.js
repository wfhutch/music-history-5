//When artist is selected in artist dropdown box the albums
//for only that artist need to be put in the album box.

define(['jquery'], function($) {

  return {
    findArtist: function(artist, songs) {

    var artistAlbums = [];
    var allArtistSongs = [];

      // console.log(artist, songs);
      for (i=0; i<songs.songs.length; i++) {
        if (artist === songs.songs[i].artist) {
          artistAlbums.push(songs.songs[i].album);
          allArtistSongs.push(songs.songs[i]);
        }
      }
      // console.log(allArtistSongs);
      // console.log(artistAlbums);

      var uniqueAlbums = _.uniq(artistAlbums);

      var allArtistSongsObject = {songs: allArtistSongs};

      require(['hbs!../templates/songs'], function(songTemplate) {    
            $("#content").html(songTemplate(allArtistSongsObject));
            $(".deleteButton").on("click", function() {
            $(this).closest("div").remove();
            });
          }); 


      // console.log(uniqueAlbums);

      require(['hbs!../templates/album'], function(albumTemplate) { 
        // $("#album").empty();
        $("#album").html(albumTemplate({'album': uniqueAlbums}));     
      });
    }
  };
});















  








  // $("#artists").change(function() {

  //   var selected = ($(this).val());
  //   console.log(selected);
  //   console.log(allSongsObject);

  // });

