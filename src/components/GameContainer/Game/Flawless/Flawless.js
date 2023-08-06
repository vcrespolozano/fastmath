import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../../../contexts/GlobalContext';
import OperationsContainer from '../OperationsContainer/OperationsContainer';
import Keyboard from '../Keyboard/Keyboard';
import { randomMathOperation, getRandomNumber } from '../../../../handlers/maths';
import { APP_GAME_DIFFICULTIES } from '../../../../constants/constants';

const Flawless = () => {

  const {
    difficulty,
    setGameStarted,
    operationsSolved,
    setOperationsSolved,
    setGameEnded,
    setShowResults
  } = useContext(GlobalContext);

  const [currentOperation, setCurrentOperation] = useState(null);
  const [currentOperationIndex, setCurrentOperationIndex] = useState(null);
  const [maxDigits1, setMaxDigits1] = useState(0);
  const [maxDigits2, setMaxDigits2] = useState(0);

  useEffect(() => {
    if (maxDigits1 === 0 && maxDigits2 === 0) {
      let auxMaxDigits1 = 1;
      let auxMaxDigits2 = 1;
      switch (difficulty) {
        case APP_GAME_DIFFICULTIES.FACIL:
          auxMaxDigits1 = getRandomNumber(1);
          auxMaxDigits2 = getRandomNumber(1);
          break;
        case APP_GAME_DIFFICULTIES.NORMAL:
          auxMaxDigits1 = getRandomNumber(2);
          auxMaxDigits2 = getRandomNumber(2);
          break;
        case APP_GAME_DIFFICULTIES.DIFICIL:
          auxMaxDigits1 = getRandomNumber(3);
          auxMaxDigits2 = getRandomNumber(3);
          break;
        default:
          break;
      }
      setMaxDigits1(auxMaxDigits1);
      setMaxDigits2(auxMaxDigits2);
    }
  }, [difficulty]);

  useEffect(() => {
    if (operationsSolved.length === 0 && !currentOperation && maxDigits1 > 0 && maxDigits2 > 0) {
      const firstOperation = randomMathOperation(maxDigits1, maxDigits2, null);
      setCurrentOperation(firstOperation);
      setCurrentOperationIndex(0);
      const auxSolvedOperations = [firstOperation];
      setOperationsSolved(auxSolvedOperations);
    }
  }, [operationsSolved, maxDigits1, maxDigits2]);

  const nextOperation = (previousOperatorClicked) => {
    if (previousOperatorClicked && currentOperationIndex !== null && currentOperation) {
      const auxSolvedOperations = operationsSolved;
      // Resuelvo la operación actual
      const auxCurrentOperationIndex = currentOperationIndex;
      const auxCurrentOperation = currentOperation;
      auxCurrentOperation.operatorSelected = previousOperatorClicked;
      auxSolvedOperations[auxCurrentOperationIndex] = auxCurrentOperation;

      if (auxCurrentOperation.operator !== auxCurrentOperation.operatorSelected) {
        // Finalizo el juego
        setOperationsSolved([
          ...auxSolvedOperations,
        ]);
        setGameEnded(true);
        setGameStarted(false);
        setShowResults(true);
      } else {
        // Preparo la siguiente operación
        if (maxDigits1 && maxDigits2) {
          const newOperation = randomMathOperation(maxDigits1, maxDigits2, null);
          setOperationsSolved([
            ...auxSolvedOperations,
            newOperation,
          ]);
          setCurrentOperationIndex(auxCurrentOperationIndex+1);
          setCurrentOperation(newOperation);
        }
      }
    }
  }

  const checkResult = (fnOperatorClicked) => {
    if (currentOperation && fnOperatorClicked) {
      nextOperation(fnOperatorClicked);
    }
  }

  return (
    <>
      <OperationsContainer operations={operationsSolved} />
      <Keyboard onClick={checkResult} />
    </>
  )
}

export default Flawless;