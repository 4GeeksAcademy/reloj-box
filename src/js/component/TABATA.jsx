// TABATA.jsx
import React, { useState, useEffect } from 'react';

function TABATA() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [rounds, setRounds] = useState(1);
  const [workTime, setWorkTime] = useState(20); // Tiempo de trabajo por defecto de 20 segundos
  const [restTime, setRestTime] = useState(10); // Tiempo de descanso por defecto de 10 segundos

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
      const selectedRounds = parseInt(document.getElementById('roundsInput').value, 10);
      setTotalSeconds(workTime);
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
      <h2>TABATA</h2>
      <div>
        Time per Round: {workTime} seconds
      </div>
      <div>Rounds: <input type="number" id="roundsInput" min="1" step="1" defaultValue="1" /></div>
      <div>{updateDisplay()}</div>
      <button onClick={startStopTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default TABATA;
