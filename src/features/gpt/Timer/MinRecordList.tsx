import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

interface MinRecord {
  time: number;
  nickname: string;
}

interface MinRecordListProps {
  minRecords: MinRecord[];
  formatTime: (milliseconds: number, emphasizeMs?: boolean) => string;
}

const MinRecordList: React.FC<MinRecordListProps> = ({ minRecords, formatTime }) => {
  return (
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
  );
};

export default MinRecordList;
