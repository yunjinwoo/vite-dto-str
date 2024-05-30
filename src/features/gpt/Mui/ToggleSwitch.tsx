import React, { useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const ToggleSwitch: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={handleChange} />}
      label="Toggle Switch"
    />
  );
};

export default ToggleSwitch;
