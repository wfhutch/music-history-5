
define(['jquery', 'q', 'authentication'], function($, Q, auth) {

  return function() {

    var deferred = Q.defer();

      var songObj = 
      { 
        "name": $("#song-name").val(),
        "artist": $("#artist-name").val(),
        "album": $("#album-name").val(),
        "genre": $("#genre").val(),
        "uid": auth.getUid()    
      };

      console.log(songObj);
      
      $.ajax({
        url: "https://flickering-fire-6777.firebaseio.com/songs.json",
        method: "POST",
        data: JSON.stringify(songObj)
      })
      .done(function (addedSong) {
        console.log(addedSong);
        deferred.resolve(addedSong);
      })
      .fail(function(xhr, status, error) {
        deferred.reject(error);
      }); 

      return deferred.promise;
  };
});








