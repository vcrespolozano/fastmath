import React, { useEffect, useState, useContext } from 'react';
import { APP_GAME_MODES } from '../../constants/constants';
import { GlobalContext } from '../../contexts/GlobalContext';
import Button from '../common/Button/Button';
import Text, {
  TEXT_SIZE,
  TEXT_WEIGHT,
  TEXT_KIND,
  TEXT_DISPLAY,
  TEXT_ALIGN,
} from '../common/Text/Text';

const DIFFICULTY_LABELS = {
  FACIL: 'Fácil',
  NORMAL: 'Normal',
  DIFICIL: 'Difícil',
}

const MODE_LABELS = {
  CLASICO: 'Clásico',
  CONTRARELOJ: 'Contrarreloj',
  SIN_FALLOS: 'Sin fallos',
}

export const GameResults = () => {

  const currentScores = localStorage.getItem('appScores') || null;

  const {
    theme,
    operationsSolved,
    timeUsed,
    difficulty,
    mode,
    setGameEnded,
    setGameStarted,
    setOperationsSolved,
    setTimeUsed,
    setShowResults,
  } = useContext(GlobalContext);

  const [scores, setScores] = useState(null);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [timeStr, setTimeStr] = useState('');
  const [scoreSaved, setScoreSaved] = useState(false);
  const [showingScores, setShowingScores] = useState(null);
  const [showingScoresArr, setShowingScoresArr] = useState([]);
  const [resultId, setResultId] = useState(null);

  useEffect(() => {
    if (currentScores) {
      const currentScoresParsed = JSON.parse(currentScores);
      const { results } = currentScoresParsed;
      if (results && results.length > 0) {
        let auxScores = {
          clasico: [],
          contrarreloj: [],
          sinFallos: []
        }
        results.forEach((itemResult) => {
          if (itemResult.mode === APP_GAME_MODES.CLASSIC) {
            auxScores.clasico.push(itemResult);
          } else if (itemResult.mode === APP_GAME_MODES.CONTRARELOJ) {
            auxScores.contrarreloj.push(itemResult);
          } else if (itemResult.mode === APP_GAME_MODES.SIN_FALLOS) {
            auxScores.sinFallos.push(itemResult);
          }
        });
        setScores(auxScores);
      }
    }
  }, [currentScores]);

  useEffect(() => {
    if (scores && mode) {
      let auxShowingScores = APP_GAME_MODES.CLASSIC;
      let auxShowingScoresArr = scores.clasico;
      if (mode === APP_GAME_MODES.CONTRARELOJ) {
        auxShowingScores = APP_GAME_MODES.CONTRARELOJ;
        auxShowingScoresArr = scores.contrarreloj;
      } else if (mode === APP_GAME_MODES.SIN_FALLOS) {
        auxShowingScores = APP_GAME_MODES.SIN_FALLOS;
        auxShowingScoresArr = scores.sinFallos;
      }
      setShowingScores(auxShowingScores);
      setShowingScoresArr(auxShowingScoresArr);
    }
  }, [mode, scores]);

  useEffect(() => {
    if (showingScores && scores) {
      let auxShowingScoresArr = scores.clasico;
      if (showingScores === APP_GAME_MODES.CONTRARELOJ) {
        auxShowingScoresArr = scores.contrarreloj;
      } else if (showingScores === APP_GAME_MODES.SIN_FALLOS) {
        auxShowingScoresArr = scores.sinFallos;
      }
      setShowingScoresArr(auxShowingScoresArr);
    }
  }, [showingScores, scores]);

  useEffect(() => {
    if (operationsSolved.length > 0) {
      let auxRightAnswers = 0;
      let auxWrongAnswers = 0;
      operationsSolved.forEach((operation, index) => {
        if (operation.operatorSelected) {
          if (operation.operator === operation.operatorSelected) {
            auxRightAnswers++;
          } else {
            auxWrongAnswers++;
          }
        }
      });
      setRightAnswers(auxRightAnswers);
      setWrongAnswers(auxWrongAnswers);
    }
  }, [operationsSolved]);

  useEffect(() => {
    if (timeUsed > 0) {
      const minutes = Math.floor(timeUsed / 60);
      const minutesStr = minutes.toString();
      const seconds = timeUsed % 60;
      const secondsStr = seconds.toString();
      let auxTimeStr = `${secondsStr} segundos`;
      if (minutes > 0) {
        auxTimeStr = `${minutesStr} minuto/s ${secondsStr} segundos`;
      }
      setTimeStr(auxTimeStr);
    }
  }, [timeUsed]);

  useEffect(() => {
    if (!scoreSaved && (rightAnswers > 0 || wrongAnswers > 0)) {
      const date = new Date();
      const dateString = date.toLocaleDateString("es-ES", {day: "2-digit", month: "2-digit", year: "numeric"});
      const auxResultId = Date.now();
      const newResult = {
        "date": dateString,
        "rightAnswers": rightAnswers,
        "wrongAnswers": wrongAnswers,
        "time": timeStr,
        "mode": mode,
        "difficulty": difficulty,
        "id": auxResultId,
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
      const auxScores = scores;
      if (mode === APP_GAME_MODES.CLASSIC) {
        auxScores.clasico.push(newResult);
      } else if (mode === APP_GAME_MODES.CONTRARELOJ) {
        auxScores.contrarreloj.push(newResult);
      } else if (mode === APP_GAME_MODES.SIN_FALLOS) {
        auxScores.sinFallos.push(newResult);
      }
      setScoreSaved(true);
      setResultId(auxResultId);
    }
  }, [timeStr, rightAnswers, wrongAnswers, currentScores, difficulty, mode, scoreSaved, scores]);

  const switchScoresMode = (scoresMode) => {
    setShowingScores(scoresMode);
  }

  const back = () => {
    setGameEnded(false);
    setOperationsSolved([]);
    setTimeUsed(0);
    setGameStarted(false);
    setShowResults(false);
  }

  return (
    <div className={`gameResults theme-${theme}`}>
      <div className="gameResults__historic">
        <div className="gameResults__historic_tabs">
          <span className={`gameResults__historic_tabs_tab ${showingScores === APP_GAME_MODES.CLASSIC ? 'on' : ''}`} onClick={() => switchScoresMode(APP_GAME_MODES.CLASSIC)}>{MODE_LABELS.CLASICO}</span>
          <span className={`gameResults__historic_tabs_tab ${showingScores === APP_GAME_MODES.CONTRARELOJ ? 'on' : ''}`} onClick={() => switchScoresMode(APP_GAME_MODES.CONTRARELOJ)}>{MODE_LABELS.CONTRARELOJ}</span>
          <span className={`gameResults__historic_tabs_tab ${showingScores === APP_GAME_MODES.SIN_FALLOS ? 'on' : ''}`} onClick={() => switchScoresMode(APP_GAME_MODES.SIN_FALLOS)}>{MODE_LABELS.SIN_FALLOS}</span>
        </div>
        <div className="gameResults__historic_scores">
          {showingScoresArr && showingScoresArr.length > 0 && showingScoresArr.map((scoreRow, index) => {
            return (
              <div key={`result-${index}`} className={`gameResults__historic_scores_row ${scoreRow.id === resultId ? 'current' : ''}`}>
                <Text
                  value={`Dificultad: ${scoreRow.difficulty}. Aciertos: ${scoreRow.rightAnswers}.${scoreRow.mode !== APP_GAME_MODES.SIN_FALLOS ? ` Fallos: ${scoreRow.wrongAnswers}.` : ''}${scoreRow.mode === APP_GAME_MODES.CLASSIC ? ` Tiempo: ${scoreRow.time}` : ''}`}
                  size={TEXT_SIZE.NORMAL}
                  weight={TEXT_WEIGHT.REGULAR}
                  kind={TEXT_KIND.PARAGRAPH}
                  display={TEXT_DISPLAY.BLOCK}
                  align={TEXT_ALIGN.LEFT}
                />
              </div>
            )
          })}
          {(!showingScoresArr || showingScoresArr.length === 0) && (
            <div className="gameResults__historic_scores_row">
              <Text
                value="Todavía no has jugado en este modo"
                size={TEXT_SIZE.NORMAL}
                weight={TEXT_WEIGHT.REGULAR}
                kind={TEXT_KIND.PARAGRAPH}
                display={TEXT_DISPLAY.BLOCK}
                align={TEXT_ALIGN.CENTER}
              />
            </div>
          )}
        </div>
      </div>
      <Button
        label="Volver"
        width={200}
        height={55}
        onClick={back}
      />
    </div>
  )
}

export default GameResults;