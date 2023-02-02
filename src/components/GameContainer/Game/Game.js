import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import OperationsContainer from './OperationsContainer/OperationsContainer';
import Keyboard from './Keyboard/Keyboard';
import Crono from './Crono/Crono';
import Button from '../../common/Button/Button';
import { randomMathOperation, getRandomNumber } from '../../../handlers/maths';
import { NUM_OPERATIONS, APP_GAME_DIFFICULTIES } from '../../../constants/constants';

const Game = ({
  mode,
  difficulty,
  operationsSolved,
  setOperationsSolved,
  setTimeUsed,
  gameEnded,
  setGameEnded,
  resetFunction,
}) => {

  const {
    setGameStarted,
  } = useContext(GlobalContext);

  const [operations, setOperations] = useState([]);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [currentOperationIndex, setCurrentOperationIndex] = useState(null);

  useEffect(() => {
    if (operations.length === 0) {
      const auxOperations = [];
      for(let o = 0; o < NUM_OPERATIONS; o++) {
        let maxDigits1 = 1;
        let maxDigits2 = 1;
        switch (difficulty) {
          case APP_GAME_DIFFICULTIES.FACIL:
            maxDigits1 = getRandomNumber(1);
            maxDigits2 = getRandomNumber(1);
            break;
          case APP_GAME_DIFFICULTIES.NORMAL:
            maxDigits1 = getRandomNumber(2);
            maxDigits2 = getRandomNumber(2);
            break;
          case APP_GAME_DIFFICULTIES.DIFICIL:
            maxDigits1 = getRandomNumber(3);
            maxDigits2 = getRandomNumber(3);
            break;
          default:
            break;
        }
        auxOperations.push(randomMathOperation(maxDigits1, maxDigits2));
      }
      setOperations(auxOperations);
    }
  }, [operations, mode, difficulty]);

  useEffect(() => {
    if (operations.length === NUM_OPERATIONS && !currentOperation) {
      setCurrentOperation(operations[0]);
      setCurrentOperationIndex(0);
      const auxSolvedOperations = [operations[0]];
      setOperationsSolved(auxSolvedOperations);
    }
  }, [operations, currentOperation]);

  const nextOperation = (previousOperatorClicked) => {
    if (currentOperationIndex !== null && currentOperationIndex <= NUM_OPERATIONS - 1) {
      const auxSolvedOperations = operationsSolved;
      // Resuelvo la operación actual
      const auxCurrentOperationIndex = currentOperationIndex;
      const auxCurrentOperation = currentOperation;
      auxCurrentOperation.operatorSelected = previousOperatorClicked;
      auxSolvedOperations[auxCurrentOperationIndex] = auxCurrentOperation;

      if (currentOperationIndex === NUM_OPERATIONS - 1) {
        // Finalizo el juego
        setOperationsSolved([
          ...auxSolvedOperations,
        ]);
        setGameEnded(true);
        setGameStarted(false);
      } else {
        // Preparo la siguiente operación
        setOperationsSolved([
          ...auxSolvedOperations,
          operations[auxCurrentOperationIndex+1],
        ]);
        setCurrentOperationIndex(auxCurrentOperationIndex+1);
        setCurrentOperation(operations[auxCurrentOperationIndex+1]);
      }
    }
  }

  const checkLastOperation = () => {
    if (operationsSolved.length === NUM_OPERATIONS) {
      const lastOperation = operationsSolved[NUM_OPERATIONS-1];
      if (lastOperation.operatorSelected) {
        return true;
      }
    }
    return false;
  }

  const checkResult = (fnOperatorClicked) => {
    const lastOperationSolved = checkLastOperation();
    if (!lastOperationSolved && currentOperation && fnOperatorClicked) {
      if (currentOperationIndex !== null && currentOperationIndex <= NUM_OPERATIONS - 1) {
        nextOperation(fnOperatorClicked);
      }
    }
  }

  return (
    <div className="game">
      <Crono
        start={!gameEnded}
        stop={gameEnded}
        setGameSeconds={setTimeUsed}
      />
      <OperationsContainer operations={operationsSolved} />
      <Keyboard onClick={checkResult} />
      <Button
        label="Salir"
        width={200}
        height={55}
        onClick={resetFunction}
      />
    </div>
  )
}

export default Game;