App.HandlebarsUtil = Ember.Object.createWithMixins({
  registerHelpers: function(str, data) {

    // code helper - prints value as HTML (so it respects <b></b> for example)
    Ember.Handlebars.registerHelper('code', function(property, options) {
      var value = Ember.Handlebars.get(this, property, options);
      return new Ember.Handlebars.SafeString(value);
    });
  }
});