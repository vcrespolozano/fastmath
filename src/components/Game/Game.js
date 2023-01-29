import { useEffect, useState } from 'react';
import OperationsContainer from './OperationsContainer/OperationsContainer';
import Keyboard from './Keyboard/Keyboard';
import { randomMathOperation, getRandomNumber } from '../../handlers/maths';
import { NUM_OPERATIONS, APP_GAME_DIFFICULTIES } from '../../constants/constants';
import './Game.scss';

const Game = ({mode, difficulty}) => {

  const [operations, setOperations] = useState([]);
  const [showingOperations, setShowingOperations] = useState([]);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [currentOperationIndex, setCurrentOperationIndex] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);

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
        }
        auxOperations.push(randomMathOperation(maxDigits1, maxDigits2));
      }
      setOperations(auxOperations);
    }
  }, [mode, difficulty]);

  useEffect(() => {
    if (operations.length === NUM_OPERATIONS && !currentOperation) {
      setCurrentOperation(operations[0]);
      setCurrentOperationIndex(0);
      const auxShowingOperations = [operations[0]];
      setShowingOperations(auxShowingOperations);
    }
  }, [operations, currentOperation]);

  const nextOperation = (previousOperatorClicked) => {
    if (currentOperationIndex !== null && currentOperationIndex <= NUM_OPERATIONS - 1) {
      const auxShowingOperations = showingOperations;
      // Resuelvo la operación actual
      const auxCurrentOperationIndex = currentOperationIndex;
      const auxCurrentOperation = currentOperation;
      auxCurrentOperation.operatorSelected = previousOperatorClicked;
      auxShowingOperations[auxCurrentOperationIndex] = auxCurrentOperation;

      if (currentOperationIndex === NUM_OPERATIONS - 1) {
        // Finalizo el juego
        setShowingOperations([
          ...auxShowingOperations,
        ]);
        endGame();
      } else {
        // Preparo la siguiente operación
        setShowingOperations([
          ...auxShowingOperations,
          operations[auxCurrentOperationIndex+1],
        ]);
        setCurrentOperationIndex(auxCurrentOperationIndex+1);
        setCurrentOperation(operations[auxCurrentOperationIndex+1]);
      }
    }
  }

  const endGame = () => {
    setGameEnded(true);
    console.log('Se acabó');
  }

  const checkResult = (fnOperatorClicked) => {
    if (currentOperation && fnOperatorClicked) {
      if (currentOperation.operator === fnOperatorClicked) {
        console.log('Correcto');
      } else {
        console.log('Error');
      }
      if (currentOperationIndex !== null && currentOperationIndex <= NUM_OPERATIONS - 1) {
        nextOperation(fnOperatorClicked);
      }
    }
  }

  return (
    <div className="game">
      <OperationsContainer operations={showingOperations} />
      <Keyboard onClick={checkResult} />
    </div>
  )
}

export default Game;