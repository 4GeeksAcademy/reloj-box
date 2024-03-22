// Mix.jsx
import React, { useState } from 'react';
import AMRAP from './AMRAP';
import FORTIME from './FORTIME';
import EMOM from './EMOM';
import TABATA from './TABATA';

function MIX() {
  const [selectedCounter, setSelectedCounter] = useState(null);

  const handleCounterChange = (event) => {
    setSelectedCounter(event.target.value);
  };

  return (
    <div>
      <h2>Mix</h2>
      <div>
        <label htmlFor="counterType">Select Counter Type:</label>
        <select id="counterType" onChange={handleCounterChange}>
          <option value="">Select...</option>
          <option value="amrap">AMRAP</option>
          <option value="FORTIME">For Time</option>
          <option value="emom">EMOM</option>
          <option value="TABATA">TABATA</option>
        </select>
      </div>
      {selectedCounter === 'amrap' && <AMRAP />}
      {selectedCounter === 'FORTIME' && <FORTIME />}
      {selectedCounter === 'emom' && <EMOM />}
      {selectedCounter === 'TABATA' && <TABATA />}
    </div>
  );
}

export default MIX;
