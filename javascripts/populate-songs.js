

define(['jquery'],function($) {

  return {
    querySongs: function(callback) {

        $.ajax({
          url: "./javascripts/songs.json",
        }).done(function(jquerydata) {
          console.log("jquerydata", jquerydata);
          callback.call(this, jquerydata);
        });
    },
  };
});