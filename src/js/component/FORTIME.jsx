import React, { useState, useEffect } from 'react';

function ForTime() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [rounds, setRounds] = useState(1);
  const [restTime, setRestTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [countType, setCountType] = useState('countdown');
  const [roundDuration, setRoundDuration] = useState(0); // Duración de cada ronda
  const [restDuration, setRestDuration] = useState(0); // Duración del descanso
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && totalSeconds > 0) {
      timer = setInterval(() => {
        setTotalSeconds(prevTotalSeconds => prevTotalSeconds - 1);
      }, 1000);
    } else if (isRunning && totalSeconds === 0) {
      if (isResting) {
        setIsResting(false);
        setCurrentRound(prevRound => prevRound + 1);
        if (currentRound < rounds) {
          setTotalSeconds(roundDuration);
        } else {
          setIsRunning(false);
        }
      } else {
        setIsResting(true);
        setTotalSeconds(restDuration);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, totalSeconds, rounds, restTime, currentRound, countType, roundDuration, restDuration, isResting]);

  const startStopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      const selectedMinutes = parseInt(document.getElementById('minutesInput').value, 10);
      const selectedSeconds = parseInt(document.getElementById('secondsInput').value, 10);
      const selectedRounds = parseInt(document.getElementById('roundsInput').value, 10);
      const selectedRestTime = parseInt(document.getElementById('restTimeInput').value, 10);
      setTotalSeconds((selectedMinutes * 60) + selectedSeconds);
      setRounds(selectedRounds);
      setRestTime(selectedRestTime);
      setRoundDuration((selectedMinutes * 60) + selectedSeconds);
      setRestDuration(selectedRestTime);
      setCurrentRound(1);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setCurrentRound(1);
  };

  const updateDisplay = () => {
    const displayMinutes = Math.floor(totalSeconds / 60);
    const displaySeconds = totalSeconds % 60;
    
    let displayText;
    if (isResting) {
      displayText = 'Descanso';
    } else {
      displayText = `${currentRound > rounds ? 'Descanso' : 'Ronda ' + currentRound}`;
    }
    
    return `${displayText}: ${displayMinutes < 10 ? '0' : ''}${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
  };

  const handleCountTypeChange = (event) => {
    setCountType(event.target.value);
  };

  const displayStyle = isResting ? { color: 'red' } : { color: 'blue' };

  return (
    <div>
      <h2>For Time</h2>
      <div>
        Time: 
        <input type="number" id="minutesInput" min="0" step="1" defaultValue="0" /> 
        minutes 
        <input type="number" id="secondsInput" min="0" max="59" step="1" defaultValue="0" /> 
        seconds
      </div>
      <div>Rounds: <input type="number" id="roundsInput" min="1" step="1" defaultValue="1" /></div>
      <div>Rest Time: <input type="number" id="restTimeInput" min="0" step="1" defaultValue="0" /> seconds</div>
      <div>
        <label htmlFor="countType">Count Type:</label>
        <select id="countType" value={countType} onChange={handleCountTypeChange}>
          <option value="countdown">Countdown</option>
          <option value="countup">Countup</option>
        </select>
      </div>
      <div style={displayStyle}>{updateDisplay()}</div>
      <button onClick={startStopTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default ForTime;
