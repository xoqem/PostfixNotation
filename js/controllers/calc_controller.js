App.calcController = Ember.ArrayController.extend({
  content: null,

  // expression - holds the postfix string, bound to the text field
  expression: null,

  // solveExpression - solves the expression, executed when 'Solve' is clicked
  solveExpression: function() {
    var steps = [];

    // TODO: make sure to show an error message if the expression is invalid,
    //       probably determine this while solving

    // TODO: make sure to store each step that is used to solve the problem

    this.set('content', steps);
  }
}).create();
