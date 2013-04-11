App.calcController = Ember.ArrayController.extend({
  // content - this will contain our solution steps, bound to an "each" block
  content: null,
  // expression - holds the postfix string, bound to the text field
  expression: null,
  // solution - holds the answer, we bind a big label to this
  solution: null,

  // solveExpression - solves the expression, executed when 'Solve' is clicked
  solveExpression: function() {
    this.set('content', null);
    this.set('solution', null);

    var expression = this.get('expression');
    if (!expression) {
      //TODO: error - please enter an expression
    }

    // tokenize the expression on white space
    var tokens = expression.split(/\s+/);
    this.fixTokens(tokens);

    console.log(tokens.join(","));

    // TODO: run through the expression string and add spaces
    //       between numbers and non-numbers for less brittle
    //       parsing

    var steps = [];
    // TODO: make sure to show an error message if the expression is invalid,
    //       probably determine this while solving

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

        // get the left and right values for this operation from the stack
        var rightValue = Number(stack.pop());
        var leftValue = Number(stack.pop());
        // make sure we have a valid operator
        if (operators.has(operator)) {
          // simply get the result from the function in our operators map
          var result = operators.get(operator)(leftValue, rightValue);
          if (isNaN(result)) {
            // TODO: error - result is non-numeric
          } else {
            // create readable step string
            steps.push([
              leftValue,
              operator,
              rightValue,
              "=",
              result
            ].join(" "));

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

    this.formatSteps(steps);
    this.set('content', steps);
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

  // formatSteps - formats the steps array exatly as requested
  formatSteps: function(steps) {
    steps.push([
      "<b>Answer:</b> ",
      this.get('solution')
    ].join(""));
    for (var i = 0; i < steps.length - 1; i++)
    {
      steps[i] = [
        "<b>Step ",
        i + 1,
        ":</b> ",
        steps[i]
      ].join("");
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
      // TODO: should we throw an error for divide by zero?
      return leftValue / rightValue;
    });
    map.set('*', function(leftValue, rightValue) {
      return leftValue * rightValue;
    });

    return map;
  }.property().cacheable()

}).create();
