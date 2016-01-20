(function(module) {
  var bioController = {};

  // DONE: Define a function that hides all main section elements, and then reveals just the #about section:
  bioController.index = function() {
    $('#entries').hide();
    $('#about').show();
  };

  module.aboutController = aboutController;
})(window);
