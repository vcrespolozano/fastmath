import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../../../contexts/GlobalContext';
import OperationsContainer from '../OperationsContainer/OperationsContainer';
import Keyboard from '../Keyboard/Keyboard';
import Crono from '../Crono/Crono';
import { randomMathOperation, getRandomNumber } from '../../../../handlers/maths';
import { APP_GAME_DIFFICULTIES } from '../../../../constants/constants';

const TimeTrial = () => {

  const {
    difficulty,
    setGameStarted,
    operationsSolved,
    setOperationsSolved,
    gameEnded,
    setGameEnded,
    setTimeUsed,
    timeUsed,
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
      const firstOperation = randomMathOperation(maxDigits1, maxDigits2);
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
      // Preparo la siguiente operación
      if (maxDigits1 && maxDigits2) {
        const newOperation = randomMathOperation(maxDigits1, maxDigits2);
        setOperationsSolved([
          ...auxSolvedOperations,
          newOperation,
        ]);
        setCurrentOperationIndex(auxCurrentOperationIndex+1);
        setCurrentOperation(newOperation);
      }
    }
  }

  useEffect(() => {
    if (timeUsed === 0) {
      // Finalizo el juego
      setGameEnded(true);
      setGameStarted(false);
    }
  }, [timeUsed]);

  const checkResult = (fnOperatorClicked) => {
    if (currentOperation && fnOperatorClicked) {
      nextOperation(fnOperatorClicked);
    }
  }

  return (
    <>
      <Crono
        start={!gameEnded}
        stop={gameEnded}
        setGameSeconds={setTimeUsed}
        timeTrial
      />
      <OperationsContainer operations={operationsSolved} />
      <Keyboard onClick={checkResult} />
    </>
  )
}

export default TimeTrial;