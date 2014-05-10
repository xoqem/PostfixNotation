define([
  'ember'
], function(Ember) {
  return Ember.ArrayController.extend({
    // content - this will contain the solution steps, bound to an "each" block
    content: null
  });
});
