define([
  'ember',
  'text!templates/application.hbs'
], function(Ember, applicationTemplate) {

  Ember.TEMPLATES.applicationTemplate =
    Ember.Handlebars.compile(applicationTemplate);

  return Ember.View.extend({
    templateName: 'applicationTemplate'
  });
});
