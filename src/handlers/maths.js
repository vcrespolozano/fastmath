export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max) + 1;
}

export const randomMathOperation = (numOfDigits1, numOfDigits2) => {
  const num1 = Math.floor(Math.random() * Math.pow(10, numOfDigits1)) + 1;
  const num2 = Math.floor(Math.random() * Math.pow(10, numOfDigits2)) + 1;
  const operation = Math.floor(Math.random() * 4);
  const returnObj = {
    op1: num1,
    op2: num2,
    operator: null,
    result: null
  }
  switch (operation) {
    case 0:
      returnObj.operator = '+';
      returnObj.result = num1 + num2;
      break;
    case 1:
      returnObj.operator = '-';
      if (num2 > num1) {
        returnObj.op1 = num2;
        returnObj.op2 = num1;
        returnObj.result = num2 - num1;
      } else {
        returnObj.result = num1 - num2;
      }
      break;
    case 2:
      returnObj.operator = '×';
      returnObj.result = num1 * num2;
      break;
    case 3:
      returnObj.operator = '÷';
      if (num1 >= num2 && (num1 % num2) === 0) {
        returnObj.result =  num1 / num2;
      }
      else if(num2 > num1 && (num2 % num1) === 0) {
        returnObj.result =  num2 / num1;
      }
      else {
        return randomMathOperation(numOfDigits1, numOfDigits2);
      }
      break;
  }
  return returnObj;
}