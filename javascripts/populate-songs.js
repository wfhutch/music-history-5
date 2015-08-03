

define(function() {

  return {
    querySongs: function(callback) {

        $.ajax({
          url: "./javascripts/songs.json",
          // async: false
        }).done(function(jquerydata) {
          console.log("jquerydata", jquerydata)
          callback.call(this, jquerydata.songs)
        });
    },
  };
});