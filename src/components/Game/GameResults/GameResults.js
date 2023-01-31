import React, { useEffect, useState } from 'react';
import { NUM_OPERATIONS } from '../../../constants/constants';
import Button from '../../common/Button/Button';
import Text, {
  TEXT_SIZE,
  TEXT_WEIGHT,
  TEXT_KIND,
  TEXT_DISPLAY,
  TEXT_ALIGN,
} from '../../common/Text/Text';

export const GameResults = ({operationsSolved, time}) => {

  // TODO: Preparar el guardado del JSON de resultados y su tratamiento para añadir un resultado nuevo
  // TODO: Añadir botón cuyo onClick reseteé el juego
  // {
  //   "results": [
  //     {
  //       "date": "YYYY-MM-DD",
  //       "rightAnswers": N,
  //       "wrongAnswers": N,
  //       "time": N,
  //       "mode": N,
  //       "difficulty": N
  //     },
  //   ]
  // }
  // var data = JSON.stringify({"results":[{"date":"2023-01-31","rightAnswers":10,"wrongAnswers":2,"time":120}]});



  const currentScores = localStorage.getItem('appScores') || null;

  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [timeStr, setTimeStr] = useState('');
  const [scoreSaved, setScoreSaved] = useState(false);

  useEffect(() => {
    if (operationsSolved.length === NUM_OPERATIONS) {
      let auxRightAnswers = 0;
      let auxWrongAnswers = 0;
      operationsSolved.forEach((operation, index) => {
        if (operation.operator === operation.operatorSelected) {
          auxRightAnswers++;
        } else {
          auxWrongAnswers++;
        }
      });
      setRightAnswers(auxRightAnswers);
      setWrongAnswers(auxWrongAnswers);
    }
  }, [operationsSolved]);

  useEffect(() => {
    if (time > 0) {
      const minutes = Math.floor(time / 60);
      const minutesStr = minutes.toString().padStart(2, "0");
      const seconds = time % 60;
      const secondsStr = seconds.toString().padStart(2, "0");
      setTimeStr(`${minutesStr}:${secondsStr}`);
    }
  }, [time]);

  useEffect(() => {
    if (timeStr !== '' && (rightAnswers > 0 || wrongAnswers > 0)) {
      setScoreSaved(true);
    }
  }, [timeStr, rightAnswers, wrongAnswers]);

  return (
    <div className="gameResults">
      <div className="gameResults__time">{timeStr}</div>
      <div className="gameResults__correct">{rightAnswers}</div>
      <div className="gameResults__wrong">{wrongAnswers}</div>
    </div>
  )
}

export default GameResults;