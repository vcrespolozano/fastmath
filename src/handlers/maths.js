import { APP_GAME_DIFFICULTIES } from '../constants/constants';

export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max) + 1;
}

export const getRandomNumberDigits = (numOfDigits, receivedMaxNumber) => {
  const maxNumber = receivedMaxNumber || Number.MAX_SAFE_INTEGER;

  // Calcular el valor máximo permitido según el número de dígitos
  const maxAllowed = Math.pow(10, numOfDigits) - 1;

  // Ajustar el valor máximo si es necesario
  const adjustedMaxNumber = maxNumber < maxAllowed ? maxNumber : maxAllowed;

  let randomNumber;
  do {
    // Generar un número aleatorio con la cantidad de dígitos especificada
    randomNumber = Math.floor(Math.random() * adjustedMaxNumber + 1);
  } while (randomNumber > adjustedMaxNumber);

  return randomNumber;
};

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
  const num1 = getRandomNumberDigits(numOfDigits1, null);
  let num2 = getRandomNumberDigits(numOfDigits2, null);
  const operation = forcedOperation || Math.floor(Math.random() * 4);
  if ((operation === 2 || operation === 3) && num2 === 1) {
    // Quitamos divisiónes y multiplicaciones con el 1
    num2 = getRandomNumberDigits(numOfDigits2, null);
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

export const randomMathOperationChain = (numOfDigits1, numOfDigits2, forcedOperation, firstNumber, difficulty) => {
  const num1 = firstNumber;
  let num2 = getRandomNumberDigits(numOfDigits2, null);
  let operation = forcedOperation || Math.floor(Math.random() * 4);
  if ((operation === 2 || operation === 3) && num2 === 1) {
    // Quitamos divisiónes y multiplicaciones con el 1
    num2 = getRandomNumberDigits(numOfDigits2, null);
  }

  const forcedIncreaseOperation = Math.random() < 0.5 ? 0 : 2;
  // Evitamos que el si el num1 es 1 y la operación una resta o división, se haga suma o multiplicación
  if ((operation === 1 || operation === 3) && num1 === 1) {
    operation = forcedIncreaseOperation;
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
        while (num2 > num1 || (num1 - num2 === 0)) {
          num2 = getRandomNumberDigits(numOfDigits2, num1);
        }
        returnObj.op2 = num2;
      }
      returnObj.result = num1 - num2;
      break;
    case 2:
      returnObj.operator = '×';
      returnObj.result = num1 * num2;
      break;
    case 3:
      returnObj.operator = '÷';
      if (num2 > num1 || num1 % num2 !== 0) {
        while (num2 > num1 || num1 % num2 !== 0) {
          num2 = getRandomNumberDigits(numOfDigits2, num1);
        }
        returnObj.op2 = num2;
      }
      returnObj.result =  num1 / num2;
      break;
    default:
      break;
  }

  // Regulamos las operaciones en base a la dificultad
  const controlOperators = [0, 1, 3]; // Dejamos fuera la multiplicación para que no descontrole la cadena con números grandes
  const controlOperatorRandomIndex = Math.floor(Math.random() * 3);
  const forcedControlOperation = controlOperators[controlOperatorRandomIndex];
  const resultLength = returnObj.result.toString().length;
  if (
    (difficulty === APP_GAME_DIFFICULTIES.FACIL && resultLength > 2)
    || (difficulty === APP_GAME_DIFFICULTIES.NORMAL && resultLength > 3)
    || (difficulty === APP_GAME_DIFFICULTIES.DIFICIL && resultLength > 5)
  ) {
    return randomMathOperationChain(numOfDigits1, numOfDigits2, forcedControlOperation, firstNumber, difficulty);
  }

  // Para evitar operaciones con más de un operador posible
  if (hasInverseOperation(returnObj.result, returnObj.op1, returnObj.op2, returnObj.operator)) {
    return randomMathOperationChain(numOfDigits1, numOfDigits2, null, firstNumber, difficulty);
  }
  return returnObj;
}