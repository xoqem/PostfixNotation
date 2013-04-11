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

    // TODO: run through the expression string and add spaces
    //       between numbers and non-numbers for less brittle
    //       parsing

    var steps = [];
    // TODO: make sure to show an error message if the expression is invalid,
    //       probably determine this while solving

    var i;
    var stack = [];
    var operators = this.get('operators');
    // tokenize the expression on white space
    var tokens = expression.split(/\s+/);
    // while we have tokens, handle them
    while (tokens.length)
    {
      // get token from beginning of list
      var token = tokens.shift();
      console.log('Stack:', stack.join(","));
      console.log('Token:', token);
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
        console.log('rightValue:', rightValue);
        console.log('leftValue:', leftValue);
        // make sure we have a valid operator
        if (operators.has(operator)) {
          // simply get the result from the function in our operators map
          var result = operators.get(operator)(leftValue, rightValue);
          if (isNaN(result)) {
            // TODO: error - result is non-numeric
          } else {
            console.log('result:', result);
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

    var answer = stack.pop();

    // format the steps array exatly as requested
    steps.push([
      "<b>Answer:</b> ",
      answer
    ].join(""));
    for (i = 0; i < steps.length - 1; i++)
    {
      steps[i] = [
        "<b>Step ",
        i + 1,
        ":</b> ",
        steps[i]
      ].join("");
    }

    this.set('solution', answer);
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
