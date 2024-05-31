import React, { useEffect, useState, useCallback } from 'react';
import { Button, List, ListItem, ListItemText, Stack } from '@mui/material';
import './Timer.css';

const Timer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [records, setRecords] = useState<number[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const formatTime = useCallback((milliseconds: number, emphasizeMs: boolean = false) => {
    const ms = milliseconds % 1000;
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / 60000) % 60;
    const hours = Math.floor(milliseconds / 3600000);

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;

    return emphasizeMs
      ? `${formattedTime}.<strong>${ms.toString().padStart(3, '0')}</strong>`
      : `${formattedTime}.${ms.toString().padStart(3, '0')}`;
  }, []);

  useEffect(() => {
    if (running) {
      const start = Date.now() - time;
      const id = setInterval(() => setTime(Date.now() - start), 1);
      setIntervalId(id);
      return () => clearInterval(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
  }, [running, time, intervalId]);

  const handleStartStop = () => {
    if (running) {
      setRunning(false);
      if (records.length < 5) {
        setRecords([...records, time]);
      }
    } else {
      if (records.length < 5) {
        setRunning(true);
      }
    }
  };

  const handleReset = () => {
    setTime(0);
    setRecords([]);
    setRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  return (
    <div className="timer">
      <h1 dangerouslySetInnerHTML={{ __html: formatTime(time) }} />
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleStartStop} disabled={records.length >= 5}>
          {running ? 'Stop' : 'Start'}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Stack>
      <List>
        {records.map((record, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={<span dangerouslySetInnerHTML={{ __html: `Record ${index + 1}: ${formatTime(record, true)}` }} />}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Timer;
