App.calcController = Ember.ArrayController.extend({
  content: null,

  // expression - holds the postfix string, bound to the text field
  expression: null,
  solution: null,

  // solveExpression - solves the expression, executed when 'Solve' is clicked
  solveExpression: function() {
    this.set('content', null);
    this.set('solution', null);

    var expression = this.get('expression');
    if (!expression) {
      //TODO: error - please enter an expression
    }

    // TODO: run through the expression string and add spaces
    //       between numbers and non-numbers for less brittle
    //       parsing

    var steps = [];
    // TODO: make sure to show an error message if the expression is invalid,
    //       probably determine this while solving

    // TODO: make sure to store each step that is used to solve the problem

    var stack = [];
    var operators = this.get('operators');
    var tokens = expression.split(' ');
    for (var i = 0; i < tokens.length; i++)
    {
      if ($.isNumeric(tokens[i])) {
        stack.push(tokens[i]);
      }
      else
      {
        var rightValue = Number(stack.pop());
        var leftValue = Number(stack.pop());
        var operator = tokens[i];

        if (operators.has(operator)) {
          var result = operators.get(operator)(leftValue, rightValue);
          if (isNaN(result)) {
            // TODO: error - result is non-numeric
          } else {
            // create readable step string
            var stepString = [];
            stepString.push(
              leftValue,
              operator,
              rightValue,
              "=",
              result
            );
            steps.push(stepString.join(" "));

            // push the result on the stack
            stack.push(result);
          }
        } else {
          // TODO: error - unknown operator
        }
      }
    }



    if (stack.length > 1) {
      // TODO: error, items left in stack, probably a too many numbers or operators
      //       in expression
    }
    else if(stack.length === 0) {
      // TODO: error, stack is empty, it should have the result in it
    }

    this.set('solution', stack.pop());
    this.set('content', steps);
  },

  // operators - map of math operators to functions (cachable getter)
  operators: function(){
    // NOTE: decided against using eval here to avoid worrying about javascript
    //       being entered into the text field
    var map = Ember.Map.create();
    map.set('+', function(leftValue, rightValue) {
      return leftValue + rightValue;
    });
    map.set('-', function(leftValue, rightValue) {
      return leftValue - rightValue;
    });
    map.set('/', function(leftValue, rightValue) {
      return leftValue / rightValue;
    });
    map.set('*', function(leftValue, rightValue) {
      return leftValue * rightValue;
    });

    return map;
  }.property().cacheable()

}).create();
