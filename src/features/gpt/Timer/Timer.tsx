import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import './Timer.css';

const Timer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [records, setRecords] = useState<number[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      const start = Date.now() - time;
      const id = setInterval(() => {
        setTime(Date.now() - start);
      }, 1);
      setIntervalId(id);
      return () => clearInterval(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
  }, [running]);

  const handleStartStop = () => {
    if (running) {
      setRunning(false);
      setRecords([...records, time]);
    } else {
      setRunning(true);
    }
  };

  const formatTime = (milliseconds: number) => {
    const ms = milliseconds % 1000;
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / 60000) % 60;
    const hours = Math.floor(milliseconds / 3600000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  };

  return (
    <div className="timer">
      <h1>{formatTime(time)}</h1>
      <Button variant="contained" color="primary" onClick={handleStartStop}>
        {running ? 'Stop' : 'Start'}
      </Button>
      <List>
        {records.map((record, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Record ${index + 1}: ${formatTime(record)}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Timer;
