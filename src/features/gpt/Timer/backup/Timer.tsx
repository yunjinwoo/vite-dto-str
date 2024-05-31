import React from 'react';
import { Button, Stack } from '@mui/material';
import '../Timer.css';
import TimerDisplay from '../TimerDisplay';
import RecordList from '../RecordList';
import MinRecordList from '../MinRecordList';
import NicknameDialog from '../NicknameDialog';
import useTimer from './useTimer';

const Timer: React.FC = () => {
  const {
    time,
    running,
    records,
    minRecords,
    open,
    nickname,
    formatTime,
    handleStartStop,
    handleReset,
    handleClose,
    handleNicknameChange,
    handleSaveNickname,
  } = useTimer();

  return (
    <div className="timer">
      <TimerDisplay time={time} formatTime={formatTime} />
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleStartStop} disabled={records.length >= 5}>
          {running ? 'Stop' : 'Start'}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Stack>
      <RecordList records={records} formatTime={formatTime} />
      <MinRecordList minRecords={minRecords} formatTime={formatTime} />
      <NicknameDialog
        open={open}
        nickname={nickname}
        onClose={handleClose}
        onChange={handleNicknameChange}
        onSave={handleSaveNickname}
      />
    </div>
  );
};

export default Timer;
