
requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../bower_components/q/q',
    'es6': "../bower_components/requirejs-babel/es6",
    'babel':'../bower_components/requirejs-babel/babel-5.8.22.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports:'Firebase'
    }
  }
});

requirejs(["jquery", "hbs", "bootstrap", "dom-access", "add-songs", "filter", "firebase", "lodash", "es6!selected", "es6!selected-album", "q", "authentication"], 
  function($, Handelbars, bootstrap, dom, addSongs, filter, _firebase, _, selected, sel_alb, q, auth) {

  var ref = new Firebase("https://flickering-fire-6777.firebaseio.com");

  var authData = ref.getAuth();
      console.log(authData);
  if (authData === null) {
  ref.authWithOAuthPopup("facebook", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
      auth.setUid(authData.uid);
      require(["core_list"], function() {});
    }
  });
    
  } else {
      auth.setUid(authData.uid);
      require(["core_list"], function() {});
  }
});  




    
