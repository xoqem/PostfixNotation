define([
  'ember',
  'text!templates/calc.hbs'
], function(Ember, calcTemplate) {

  Ember.TEMPLATES.calcTemplate = Ember.Handlebars.compile(calcTemplate);

  return Ember.View.extend({
    templateName: 'calcTemplate'
  });
});
