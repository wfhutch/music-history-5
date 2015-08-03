

define(function() {

  return {
    querySongs: function(callback) {

        $.ajax({
          url: "./javascripts/songs2.json",
          // async: false
        }).done(function(jquerydata) {
          callback.call(this, jquerydata.songs)
        });
    },
  };
});

