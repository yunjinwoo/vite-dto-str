import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface NicknameDialogProps {
  open: boolean;
  nickname: string;
  onClose: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const NicknameDialog: React.FC<NicknameDialogProps> = ({ open, nickname, onClose, onChange, onSave }) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSave();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Nickname for Minimum Record</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nickname"
          type="text"
          fullWidth
          value={nickname}
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NicknameDialog;
