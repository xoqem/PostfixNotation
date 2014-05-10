define([
  'ember'
], function(Ember) {
  return Em.TextField.extend({
    didInsertElement: function () {
      this.$().focus();
    }
  });
});
