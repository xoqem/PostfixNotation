var App = Ember.Application.create({
  name: "PostfixNotation",
  ready: function() {
    // register the helpers from our handlebars util
    App.HandlebarsUtil.registerHelpers();
  }
});
