function generateMathOperation() {
  // Generate two random numbers between 1 and 99
  var num1 = Math.floor(Math.random() * 99) + 1;
  var num2 = Math.floor(Math.random() * 99) + 1;
  
  // Generate a random operator
  var operators = ["+", "-", "*", "/"];
  var operator = operators[Math.floor(Math.random() * operators.length)];
  
  // Return the math operation as a string
  return num1 + " " + operator + " " + num2;
}

function checkMathOperation(operation) {
  // Use regex to extract the operator and operands from the string
  var regex = /(\d+) ([+\-*/]) (\d+)/;
  var match = regex.exec(operation);
  
  // Get the operator and operands from the match
  var num1 = parseInt(match[1]);
  var operator = match[2];
  var num2 = parseInt(match[3]);
  
  // Perform the operation and check if the answer is correct
  var correctAnswer;
  switch (operator) {
    case "+":
      correctAnswer = num1 + num2;
      break;
    case "-":
      correctAnswer = num1 - num2;
      break;
    case "*":
      correctAnswer = num1 * num2;
      break;
    case "/":
      correctAnswer = num1 / num2;
      break;
    default:
      throw new Error("Invalid operator");
  }
  
  // Get the user answer and compare it to the correct answer
  var userAnswer = prompt("What is the result of " + operation + "?");
  if (userAnswer === correctAnswer) {
    alert("Correct!");
  } else {
    alert("Incorrect. The correct answer is " + correctAnswer);
  }
}