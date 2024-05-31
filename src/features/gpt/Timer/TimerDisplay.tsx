import React from 'react';

interface TimerDisplayProps {
  time: number;
  formatTime: (milliseconds: number, emphasizeMs?: boolean) => string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, formatTime }) => {
  return <h1 dangerouslySetInnerHTML={{ __html: formatTime(time) }} />;
};

export default TimerDisplay;
