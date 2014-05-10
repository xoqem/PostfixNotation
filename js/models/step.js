define([
  'ember'
], function(Ember) {
  return Ember.Object.extend({
    index: 0,
    leftValue: 0,
    rightValue: 0,
    operator: null,
    result: 0
  });
});
