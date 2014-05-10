define([
  'jquery',
  'ember',
  'controllers/step_controller',
  'models/step',
  'utils/string_util'
], function($, Ember, StepController, Step, StringUtil) {
  return Ember.Controller.extend({
    // expression - holds the postfix string, bound to the text field
    expression: null,
    // solution - holds the answer, bound to a big label
    solution: null,
    // error - holds any error message, bound to an error box
    error: null,
    // lastExpression - the last attempted expression
    lastExpression: null,

    stepController: StepController.create(),


    // solveExpression - solves the expression, executed when 'Solve' is clicked
    solveExpression: function() {
      this.set('content', null);
      this.set('solution', null);
      this.set('error', null);

      this.stepController.clear();

      // make sure we are dealing with a string value
      expression = this.get('expression');
      expression = expression ? expression.toString() : "";

      // trim, and also escape to make sure we don't open ourselves
      // up to any JS shenanigans in the expressions box (though Ember /
      // Handlebars seem to be smart enough not to run JS code in the
      // templates unless you make a specific helper to do that).
      var expression = StringUtil.escapeHtml(expression.trim());
      this.set('expression', expression);

      // since the expression variable will change as we type, we save off the
      // last expression for error messages
      this.set('lastExpression', expression);

      if (!expression) {
        this.set('error', "Please enter an expression");
        return;
      }

      // tokenize the expression on white space
      var tokens = expression.split(/\s+/);
      this.fixTokens(tokens);

      var stepNumber = 0;
      var steps = [];
      var stack = [];
      var operators = this.get('operators');

      // while we have tokens, handle them
      while (tokens.length)
      {
        // get token from beginning of list
        var token = tokens.shift();
        // if our token is numeric, push it on the stack
        if ($.isNumeric(token)) {
          stack.push(token);
        }
        // otherwise, our token must be an operator
        else
        {
          var operator = token;

          if (stack.length < 2) {
            this.set('error', "Not enough numbers for operator: " + operator);
            return;
          }

          // get the left and right values for this operation from the stack
          var rightValue = Number(stack.pop());
          var leftValue = Number(stack.pop());
          // make sure we have a valid operator
          if (operators.has(operator)) {
            // simply get the result from the function in our operators map
            var result = operators.get(operator)(leftValue, rightValue);
            if (isNaN(result)) {
              this.set('error', "Result was not a number: " + result);
              return;
            } else {
              // increment step whenever we process an operator
              stepNumber++;

              // create the object for this step
              steps.push(Step.create({
                index: stepNumber,
                leftValue: leftValue,
                rightValue: rightValue,
                operator: operator,
                result: result
              }));

              // push the result on the stack
              stack.push(result);
            }
          } else {
            this.set('error', "Invalid operator: " + operator);
            return;
          }
        }
      }

      if (stack.length > 1) {
        this.set('error', "Too many numbers for given operators");
        return;
      }
      else if(stack.length === 0) {
        // this case shouldn't happen given our other error checks
        this.set('error', "Answer was not calculated properly");
        return;
      }

      this.set('solution', stack.pop());

      // pass our steps to the step controller now that the solution was successfully found
      this.stepController.set('content', steps);
    },

    // fixTokens - fix tokens that have numbers and operators with no whitespace
    fixTokens: function(tokens) {
      for (var i = tokens.length - 1; i >= 0; i--) {
        var token = tokens[i];
        // non-numeric tokens should only be 1 in length if they are operators
        if (!$.isNumeric(token) && token.length > 1) {
          // remove the bad token
          tokens.splice(i, 1);

          var subEnd = token.length;
          for (var j = token.length - 1; j > 0; j--) {
            if (!$.isNumeric(token[j]) || !$.isNumeric(token[j - 1])) {
              // break the string into more tokens at each non-numeric character
              tokens.splice(i, 0, token.substring(j, subEnd));
              subEnd = j;
            }
          }

          tokens.splice(i, 0, token.substring(0, subEnd));
        }
      }
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
        // TODO: should we throw an error for divide by zero?  Currently returns
        //       infinity, which is probably ok.
        return leftValue / rightValue;
      });
      map.set('*', function(leftValue, rightValue) {
        return leftValue * rightValue;
      });

      return map;
    }.property().cacheable()

  });
});
