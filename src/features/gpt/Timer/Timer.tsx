import React, { useEffect, useState, useCallback } from 'react';
import { Button, List, ListItem, ListItemText, Stack, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import './Timer.css';

interface MinRecord {
  time: number;
  nickname: string;
}

const Timer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [records, setRecords] = useState<number[]>([]);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [minRecords, setMinRecords] = useState<MinRecord[]>([]);
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState('');

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
    let id: number | null = null;

    if (running) {
      const start = Date.now() - time;
      id = window.setInterval(() => setTime(Date.now() - start), 1);
      setIntervalId(id);
    }

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [running, time]);

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
    if (records.length > 0) {
      const min = records.reduce((prev, curr) => (curr % 1000 < prev % 1000 ? curr : prev));
      const currentMinRecord = minRecords.length > 0 ? minRecords[0].time % 1000 : Infinity;
      if (min % 1000 < currentMinRecord) {
        setOpen(true);
      }
      setMinRecords((prevMinRecords) => {
        const newMinRecords = [...prevMinRecords, { time: min, nickname: '' }];
        return newMinRecords.sort((a, b) => (a.time % 1000) - (b.time % 1000));
      });
    }
    setTime(0);
    setRecords([]);
    setRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMinRecords((prevMinRecords) => prevMinRecords.slice(0, -1)); // Remove the last empty record if canceled
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleSaveNickname = () => {
    setMinRecords((prevMinRecords) => {
      const newMinRecords = prevMinRecords.sort((a, b) => (a.time % 1000) - (b.time % 1000));
      const appendNickRecords = [{ ...newMinRecords[0], nickname }, ...newMinRecords.slice(1)];
      return appendNickRecords;
    });
    setNickname('');
    setOpen(false);
  };

  return (
    <div className="timer">
      <h1>{formatTime(time)}</h1>
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
      {minRecords.length > 0 && (
        <div>
          <Typography variant="h6" className="min-record">
            Min Records:
          </Typography>
          <List>
            {minRecords.map((record, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={<span dangerouslySetInnerHTML={{ __html: `Min Record ${index + 1}: ${formatTime(record.time, true)} ${record.nickname && `(${record.nickname})`}` }} />}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Nickname for Minimum Record</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nickname"
            type="text"
            fullWidth
            value={nickname}
            onChange={handleNicknameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveNickname} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Timer;
