//When artist is selected in artist dropdown box the albums
//for only that artist need to be put in the album box.

import * as $ from "jquery";

export default {
  findArtist: function(artist, songs) {

  var artistAlbums = [];
  var allArtistSongs = [];

    console.log(artist, songs);

    for (let i=0; i<songs.songs.length; i++) {
      if (artist === songs.songs[i].artist) {
        artistAlbums.push(songs.songs[i].album);
        allArtistSongs.push(songs.songs[i]);
      }
    }

    console.log(allArtistSongs);
    console.log(artistAlbums);

    var uniqueAlbums = _.uniq(artistAlbums);
    console.log(uniqueAlbums);

    var allArtistSongsObject = {songs: allArtistSongs};
    console.log(allArtistSongsObject);

    require(['hbs!../templates/songs'], function(songTemplate) {    
          $("#content").html(songTemplate(allArtistSongsObject));
          console.log("passed to template", allArtistSongsObject);
          $(".deleteButton").on("click", function() {
          $(this).closest("div").remove();
          });
        }); 

    require(['hbs!../templates/album'], function(albumTemplate) { 
      $("#album").html(albumTemplate({'album': uniqueAlbums}));     
    });
  }
};
