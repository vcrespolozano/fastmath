function randomMathOperation(num1, num2) {
  var operation = Math.floor(Math.random() * 4);
  switch (operation) {
    case 0:
      return num1 + num2;
    case 1:
      return num1 - num2;
    case 2:
      return num1 * num2;
    case 3:
      if (num1 >= num2 && (num1 % num2) === 0) {
        return num1 / num2;
      }
      else if(num2 > num1 && (num2 % num1) === 0) {
        return num2 / num1;
      }
      else {
        return randomMathOperation(num1, num2);
      }
  }
}

function randomNumbers(numOfDigits) {
  var num1 = Math.floor(Math.random() * Math.pow(10, numOfDigits));
  var num2 = Math.floor(Math.random() * Math.pow(10, numOfDigits));
  return [num1, num2];
}
