import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface RecordListProps {
  records: number[];
  formatTime: (milliseconds: number, emphasizeMs?: boolean) => string;
}

const RecordList: React.FC<RecordListProps> = ({ records, formatTime }) => {
  return (
    <List>
      {records.map((record, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={<span dangerouslySetInnerHTML={{ __html: `Record ${index + 1}: ${formatTime(record, true)}` }} />}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default RecordList;
