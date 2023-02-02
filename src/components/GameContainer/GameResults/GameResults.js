import React, { useEffect, useState, useContext } from 'react';
import { NUM_OPERATIONS } from '../../../constants/constants';
import { GlobalContext } from '../../../contexts/GlobalContext';
import Button from '../../common/Button/Button';
import Text, {
  TEXT_SIZE,
  TEXT_WEIGHT,
  TEXT_KIND,
  TEXT_DISPLAY,
  TEXT_ALIGN,
} from '../../common/Text/Text';

export const GameResults = ({
  operationsSolved,
  time,
  mode,
  difficulty,
  resetFunction
}) => {

  const currentScores = localStorage.getItem('appScores') || null;

  const { theme } = useContext(GlobalContext);

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
      const minutesStr = minutes.toString();
      const seconds = time % 60;
      const secondsStr = seconds.toString();
      let auxTimeStr = `${secondsStr} segundos`;
      if (minutes > 0) {
        auxTimeStr = `${minutesStr} minutos ${secondsStr} segundos`;
      }
      setTimeStr(auxTimeStr);
    }
  }, [time]);

  useEffect(() => {
    if (!scoreSaved && timeStr !== '' && (rightAnswers > 0 || wrongAnswers > 0)) {
      const date = new Date();
      const dateString = date.toLocaleDateString("es-ES", {day: "2-digit", month: "2-digit", year: "numeric"});
      const newResult = {
        "date": dateString,
        "rightAnswers": rightAnswers,
        "wrongAnswers": wrongAnswers,
        "time": timeStr,
        "mode": mode,
        "difficulty": difficulty
      }
      let resultsUpdated = [];
      if (currentScores) {
        const currentScoresParsed = JSON.parse(currentScores);
        const { results } = currentScoresParsed;
        resultsUpdated = [
          newResult,
          ...results,
        ];
      } else {
        resultsUpdated = [newResult];
      }
      const resultsUpdatedJSON = { results: resultsUpdated };
      localStorage.setItem('appScores', JSON.stringify(resultsUpdatedJSON));
      setScoreSaved(true);
    }
  }, [timeStr, rightAnswers, wrongAnswers]);

  return (
    <div className={`gameResults theme-${theme}`}>
      <Text
        value={`Has tardado: ${timeStr}`}
        size={TEXT_SIZE.BIG}
        weight={TEXT_WEIGHT.REGULAR}
        kind={TEXT_KIND.PARAGRAPH}
        display={TEXT_DISPLAY.BLOCK}
        align={TEXT_ALIGN.CENTER}
        className="gameResults__time"
      />
      <Text
        value={`Aciertos: ${rightAnswers}`}
        size={TEXT_SIZE.BIG}
        weight={TEXT_WEIGHT.REGULAR}
        kind={TEXT_KIND.PARAGRAPH}
        display={TEXT_DISPLAY.BLOCK}
        align={TEXT_ALIGN.CENTER}
        className="gameResults__correct"
      />
      <Text
        value={`Fallos: ${wrongAnswers}`}
        size={TEXT_SIZE.BIG}
        weight={TEXT_WEIGHT.REGULAR}
        kind={TEXT_KIND.PARAGRAPH}
        display={TEXT_DISPLAY.BLOCK}
        align={TEXT_ALIGN.CENTER}
        className="gameResults__wrong"
      />
      <Button
        label="Volver a jugar"
        width={200}
        height={55}
        onClick={resetFunction}
      />
    </div>
  )
}

export default GameResults;