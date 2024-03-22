// EMOM.jsx
import React, { useState, useEffect } from 'react';

function EMOM() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [rounds, setRounds] = useState(1);
  const [countType, setCountType] = useState('countdown');

  useEffect(() => {
    let timer;
    if (isRunning && totalSeconds > 0) {
      timer = setInterval(() => {
        setTotalSeconds(prevTotalSeconds => prevTotalSeconds - 1);
      }, 1000);
    } else if (isRunning && rounds > 1 && totalSeconds === 0) {
      setTotalSeconds(60);
      setRounds(prevRounds => prevRounds - 1);
    } else if (isRunning && rounds === 1 && totalSeconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, totalSeconds, rounds]);

  const startStopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      const selectedMinutes = parseInt(document.getElementById('minutesInput').value, 10);
      const selectedRounds = parseInt(document.getElementById('roundsInput').value, 10);
      setMinutes(selectedMinutes);
      setTotalSeconds(60);
      setRounds(selectedRounds);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setSeconds(0);
    setMinutes(0);
    setRounds(1);
  };

  const updateDisplay = () => {
    const displayMinutes = Math.floor(totalSeconds / 60);
    const displaySeconds = totalSeconds % 60;
    return `${displayMinutes < 10 ? '0' : ''}${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
  };

  return (
    <div>
      <h2>EMOM (Every Minute on the Minute)</h2>
      <div>
        Time per Round: 1 minute
      </div>
      <div>Rounds: <input type="number" id="roundsInput" min="1" step="1" defaultValue="1" /></div>
      <div>{updateDisplay()}</div>
      <button onClick={startStopTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default EMOM;
