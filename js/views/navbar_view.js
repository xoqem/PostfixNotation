define([
  'ember',
  'text!templates/navbar.hbs'
], function(Ember, navbarTemplate) {

  Ember.TEMPLATES.navbarTemplate = Ember.Handlebars.compile(navbarTemplate);

  return  Ember.View.extend({
    templateName: 'navbarTemplate'
  });
});
