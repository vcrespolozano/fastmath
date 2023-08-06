export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max) + 1;
}

export const getRandomNumberDigits = (numOfDigits, avoidOne) => {
  if (avoidOne) {
    return Math.floor(Math.random() * Math.pow(10, numOfDigits)) + 2;
  }
  return Math.floor(Math.random() * Math.pow(10, numOfDigits)) + 1;
}

export const hasInverseOperation = (result, op1, op2, operator) => {
  if (op1 + op2 === result && operator !== '+') {
    return true;
  } else if (op1 - op2 === result && operator !== '-') {
    return true;
  } else if (op1 * op2 === result && operator !== '×') {
    return true;
  } else if (op1 / op2 === result && operator !== '÷') {
    return true;
  }
  return false;
}

export const randomMathOperation = (numOfDigits1, numOfDigits2, forcedOperation) => {
  const num1 = getRandomNumberDigits(numOfDigits1, false);
  let num2 = getRandomNumberDigits(numOfDigits2, false);
  const operation = forcedOperation || Math.floor(Math.random() * 4);
  if ((operation === 2 || operation === 3) && num2 === 1) {
    // Quitamos divisiónes y multiplicaciones con el 1
    num2 = getRandomNumberDigits(numOfDigits2, true);
  }

  const returnObj = {
    op1: num1,
    op2: num2,
    operator: null,
    operatorSelected: null,
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
      if (num2 > num1) {
        returnObj.op1 = num2;
        returnObj.op2 = num1;
      }
      if (num1 >= num2 && (num1 % num2) === 0) {
        returnObj.result =  num1 / num2;
      } else if (num2 > num1 && (num2 % num1) === 0) {
        returnObj.result =  num2 / num1;
      } else {
        return randomMathOperation(numOfDigits1, numOfDigits2, 3);
      }
      break;
    default:
      break;
  }
  // Para evitar operaciones con más de un operador posible
  if (hasInverseOperation(returnObj.result, returnObj.op1, returnObj.op2, returnObj.operator)) {
    return randomMathOperation(numOfDigits1, numOfDigits2, null);
  }
  return returnObj;
}