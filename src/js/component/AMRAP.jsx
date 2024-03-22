// AMRAP.jsx
import React, { useState, useEffect } from 'react';

function AMRAP() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [rounds, setRounds] = useState(1);
  const [restTime, setRestTime] = useState(0);
  const [countType, setCountType] = useState('countdown');

  useEffect(() => {
    let timer;
    if (isRunning && totalSeconds > 0) {
      timer = setInterval(() => {
        setTotalSeconds(prevTotalSeconds => prevTotalSeconds - 1);
      }, 1000);
    } else if (isRunning && rounds > 1 && totalSeconds === 0) {
      setTotalSeconds(restTime);
      setRounds(prevRounds => prevRounds - 1);
    } else if (isRunning && rounds === 1 && totalSeconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, totalSeconds, rounds, restTime]);

  const startStopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      const selectedMinutes = parseInt(document.getElementById('minutesInput').value, 10);
      const selectedSeconds = parseInt(document.getElementById('secondsInput').value, 10);
      const selectedRounds = parseInt(document.getElementById('roundsInput').value, 10);
      const selectedRestTime = parseInt(document.getElementById('restTimeInput').value, 10);
      setMinutes(selectedMinutes);
      setSeconds(selectedSeconds);
      setTotalSeconds((selectedMinutes * 60) + selectedSeconds);
      setRounds(selectedRounds);
      setRestTime(selectedRestTime);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setSeconds(0);
    setMinutes(0);
    setRounds(1);
    setRestTime(0);
  };

  const updateDisplay = () => {
    const displayMinutes = Math.floor(totalSeconds / 60);
    const displaySeconds = totalSeconds % 60;
    return `${displayMinutes < 10 ? '0' : ''}${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
  };

  const handleCountTypeChange = (event) => {
    setCountType(event.target.value);
  };

  return (
    <div>
      <h2>AMRAP (As Many Reps As Possible)</h2>
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
      <div style={{ color: totalSeconds === restTime ? 'red' : 'black' }}>{updateDisplay()}</div>
      <button onClick={startStopTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default AMRAP;
