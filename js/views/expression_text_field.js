App.ExpressionTextField = Em.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});