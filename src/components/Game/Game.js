import { useEffect, useState } from 'react';
import Operation from './Operation/Operation';
import OperationsContainer from './OperationsContainer/OperationsContainer';
import { randomMathOperation, getRandomNumber } from '../../handlers/maths';
import { NUM_OPERATIONS, APP_GAME_DIFFICULTIES } from '../../constants/constants';
import './Game.scss';

const Game = ({mode, difficulty}) => {

  const [operations, setOperations] = useState([]);

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

  return (
    <div className="game">
      <OperationsContainer>
        {
          operations.length === NUM_OPERATIONS && (
            operations.map((itemOperation, index) => {
              return <Operation
                op1={itemOperation.op1}
                op2={itemOperation.op2}
                operator={itemOperation.operator}
                result={itemOperation.result}
              />
            })
          )
        }
      </OperationsContainer>
    </div>
  )
}

export default Game;