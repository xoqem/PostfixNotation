define([
  'ember',
  'controllers/calc_controller',
  'views/application_view',
  'views/calc_view',
  'views/expression_text_field',
  'views/navbar_view'
], function(Ember,
             CalcController,
             ApplicationView,
             CalcView,
             ExpressionTextField,
             NavbarView) {
  return Ember.Application.extend({
    name: "PostfixNotation",

    calcController: CalcController.create(),

    ApplicationView: ApplicationView,
    CalcView: CalcView,
    ExpressionTextField: ExpressionTextField,
    NavbarView: NavbarView,

    ready: function () {
    }
  });
});
