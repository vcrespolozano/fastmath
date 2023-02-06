import React, { useEffect, useState, useContext } from 'react';
import { APP_GAME_DIFFICULTIES, APP_GAME_MODES } from '../../../constants/constants';
import { GlobalContext } from '../../../contexts/GlobalContext';
import Button from '../../common/Button/Button';
import Text, {
  TEXT_SIZE,
  TEXT_WEIGHT,
  TEXT_KIND,
  TEXT_DISPLAY,
  TEXT_ALIGN,
} from '../../common/Text/Text';

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

export const GameResults = ({
  resetFunction
}) => {

  const currentScores = localStorage.getItem('appScores') || null;

  const {
    theme,
    operationsSolved,
    timeUsed,
    difficulty,
    mode
  } = useContext(GlobalContext);

  const [scores, setScores] = useState(null);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [timeStr, setTimeStr] = useState('');
  const [scoreSaved, setScoreSaved] = useState(false);
  const [modeLabel, setModeLabel] = useState(null);
  const [difficultyLabel, setDifficultyLabel] = useState(null);
  const [showingScores, setShowingScores] = useState(APP_GAME_MODES.CLASSIC);
  const [showingScoresArr, setShowingScoresArr] = useState([]);

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
        if (showingScores) {
          let auxShowingScoresArr = auxScores.clasico;
          if (showingScores === APP_GAME_MODES.CONTRARELOJ) {
            auxShowingScoresArr = auxScores.contrarreloj;
          } else if (showingScores === APP_GAME_MODES.SIN_FALLOS) {
            auxShowingScoresArr = auxScores.sinFallos;
          }
          setShowingScoresArr(auxShowingScoresArr);
        }
      }
    }
  }, [currentScores]);

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
    if (mode) {
      let auxModeLabel = MODE_LABELS.CLASICO;
      if (mode === APP_GAME_MODES.CONTRARELOJ) {
        auxModeLabel = MODE_LABELS.CONTRARELOJ;
      } else if (mode === APP_GAME_MODES.SIN_FALLOS) {
        auxModeLabel = MODE_LABELS.SIN_FALLOS;
      }
      setModeLabel(auxModeLabel);
    }
    if (difficulty) {
      let auxDifficultyLabel = DIFFICULTY_LABELS.FACIL;
      if (difficulty === APP_GAME_DIFFICULTIES.NORMAL) {
        auxDifficultyLabel = DIFFICULTY_LABELS.NORMAL;
      } else if (difficulty === APP_GAME_DIFFICULTIES.DIFICIL) {
        auxDifficultyLabel = DIFFICULTY_LABELS.DIFICIL;
      }
      setDifficultyLabel(auxDifficultyLabel);
    }
  }, [mode, difficulty]);

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
        auxTimeStr = `${minutesStr} minutos ${secondsStr} segundos`;
      }
      setTimeStr(auxTimeStr);
    }
  }, [timeUsed]);

  useEffect(() => {
    if (!scoreSaved && (rightAnswers > 0 || wrongAnswers > 0)) {
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

  const switchScoresMode = (scoresMode) => {
    setShowingScores(scoresMode);
  }

  return (
    <div className={`gameResults theme-${theme}`}>
      {operationsSolved && operationsSolved.length > 0 && (
        <div className="gameResults__current">
          {modeLabel && (
            <Text
              value={modeLabel}
              size={TEXT_SIZE.BIG}
              weight={TEXT_WEIGHT.REGULAR}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.CENTER}
            />
          )}
          {difficultyLabel && (
            <Text
              value={difficultyLabel}
              size={TEXT_SIZE.BIG}
              weight={TEXT_WEIGHT.REGULAR}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.CENTER}
            />
          )}
          {timeStr > 0 && (
            <Text
              value={`Has tardado: ${timeStr}`}
              size={TEXT_SIZE.BIG}
              weight={TEXT_WEIGHT.REGULAR}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.CENTER}
            />
          )}
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
      )}
      <div className="gameResults__historic">
        <div className="gameResults__historic_tabs">
          <span className={`gameResults__historic_tabs_tab ${showingScores === APP_GAME_MODES.CLASSIC ? 'on' : ''}`} onClick={() => switchScoresMode(APP_GAME_MODES.CLASSIC)}>{MODE_LABELS.CLASICO}</span>
          <span className={`gameResults__historic_tabs_tab ${showingScores === APP_GAME_MODES.CONTRARELOJ ? 'on' : ''}`} onClick={() => switchScoresMode(APP_GAME_MODES.CONTRARELOJ)}>{MODE_LABELS.CONTRARELOJ}</span>
          <span className={`gameResults__historic_tabs_tab ${showingScores === APP_GAME_MODES.SIN_FALLOS ? 'on' : ''}`} onClick={() => switchScoresMode(APP_GAME_MODES.SIN_FALLOS)}>{MODE_LABELS.SIN_FALLOS}</span>
        </div>
        <div className="gameResults__historic_scores">
          {showingScoresArr && showingScoresArr.map((scoreRow) => {
            return (
              <div className="gameResults__historic_scores_row">
                <Text
                  value={`${scoreRow.date} ${scoreRow.difficulty} ${scoreRow.mode} ${scoreRow.rightAnswers} ${scoreRow.time} ${scoreRow.wrongAnswers}`}
                  size={TEXT_SIZE.NORMAL}
                  weight={TEXT_WEIGHT.REGULAR}
                  kind={TEXT_KIND.PARAGRAPH}
                  display={TEXT_DISPLAY.BLOCK}
                  align={TEXT_ALIGN.LEFT}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GameResults;