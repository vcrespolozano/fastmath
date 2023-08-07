import React, { useEffect, useState, useContext } from 'react';
import { APP_GAME_DIFFICULTIES, APP_GAME_MODES } from '../../constants/constants';
import { GlobalContext } from '../../contexts/GlobalContext';
import { BsSpeedometer2 } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { BiTimeFive } from 'react-icons/bi';
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
  CADENA: 'Cadena',
}

export const GameResults = () => {

  const currentScores = localStorage.getItem('appScores') || null;

  const {
    operationsSolved,
    timeUsed,
    difficulty,
    mode,
    setGameEnded,
    setGameStarted,
    setOperationsSolved,
    setTimeUsed,
    setShowResults,
    windowSize,
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
    let auxScores = {
      clasico: [],
      contrarreloj: [],
      sinFallos: [],
      cadena: [],
    }
    if (currentScores) {
      const currentScoresParsed = JSON.parse(currentScores);
      const { results } = currentScoresParsed;
      if (results && results.length > 0) {
        results.forEach((itemResult) => {
          if (itemResult.mode === APP_GAME_MODES.CLASSIC) {
            auxScores.clasico.push(itemResult);
          } else if (itemResult.mode === APP_GAME_MODES.CONTRARELOJ) {
            auxScores.contrarreloj.push(itemResult);
          } else if (itemResult.mode === APP_GAME_MODES.SIN_FALLOS) {
            auxScores.sinFallos.push(itemResult);
          } else if (itemResult.mode === APP_GAME_MODES.CADENA) {
            auxScores.cadena.push(itemResult);
          }
        });
      }
    }
    setScores(auxScores);
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
      } else if (mode === APP_GAME_MODES.CADENA) {
        auxShowingScores = APP_GAME_MODES.CADENA;
        auxShowingScoresArr = scores.cadena;
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
      } else if (showingScores === APP_GAME_MODES.CADENA) {
        auxShowingScoresArr = scores.cadena;
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
      let auxTimeStr = `${secondsStr}s`;
      if (minutes > 0) {
        auxTimeStr = `${minutesStr}m ${secondsStr}s`;
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
      } else if (mode === APP_GAME_MODES.CADENA) {
        auxScores.cadena.push(newResult);
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

  const getDifficultyLabel = (difficulty) => {
    let difficultyLabel = DIFFICULTY_LABELS.FACIL;
    if (difficulty === APP_GAME_DIFFICULTIES.NORMAL) {
      difficultyLabel = DIFFICULTY_LABELS.NORMAL;
    } else if (difficulty === APP_GAME_DIFFICULTIES.DIFICIL) {
      difficultyLabel = DIFFICULTY_LABELS.DIFICIL;
    }
    return difficultyLabel;
  }

  return (
    <div className="gameResults">
      <div className="gameResults__historic">
        <div className="gameResults__historic_tabs">
          <span className={`gameResults__historic_tabs_tab ${showingScores === APP_GAME_MODES.CLASSIC ? 'on' : ''}`} onClick={() => switchScoresMode(APP_GAME_MODES.CLASSIC)}>{MODE_LABELS.CLASICO}</span>
          <span className={`gameResults__historic_tabs_tab ${showingScores === APP_GAME_MODES.CONTRARELOJ ? 'on' : ''}`} onClick={() => switchScoresMode(APP_GAME_MODES.CONTRARELOJ)}>{MODE_LABELS.CONTRARELOJ}</span>
          <span className={`gameResults__historic_tabs_tab ${showingScores === APP_GAME_MODES.SIN_FALLOS ? 'on' : ''}`} onClick={() => switchScoresMode(APP_GAME_MODES.SIN_FALLOS)}>{MODE_LABELS.SIN_FALLOS}</span>
          <span className={`gameResults__historic_tabs_tab ${showingScores === APP_GAME_MODES.CADENA ? 'on' : ''}`} onClick={() => switchScoresMode(APP_GAME_MODES.CADENA)}>{MODE_LABELS.CADENA}</span>
        </div>
        <div className="gameResults__historic_scores">
          {showingScoresArr && showingScoresArr.length > 0 && showingScoresArr.map((scoreRow, index) => {
            const animate_style = index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight';
            return (
              <div key={`result-${showingScores}-${index}`} className={`gameResults__historic_scores_row animate__animated ${animate_style} ${scoreRow.id === resultId ? 'current' : ''}`}>
                <span className="score_info"><BsSpeedometer2 size={20} />{getDifficultyLabel(scoreRow.difficulty)}</span>
                <span className="score_info"><AiOutlineCheck size={20} />{scoreRow.rightAnswers}</span>
                {showingScores !== APP_GAME_MODES.SIN_FALLOS && (
                    <span className="score_info hide_mobile"><RxCross1 size={20} />{scoreRow.wrongAnswers}</span>
                )}
                {(showingScores === APP_GAME_MODES.CLASSIC || showingScores === APP_GAME_MODES.CADENA) && (
                  <span className="score_info"><BiTimeFive size={20} />{scoreRow.time}</span>
                )}
              </div>
            )
          })}
          {(!showingScoresArr || showingScoresArr.length === 0) && (
            <div className="gameResults__historic_scores_row noResult">
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
        width={windowSize > 768 ? '200px' : '100%'}
        height={55}
        onClick={back}
      />
    </div>
  )
}

export default GameResults;