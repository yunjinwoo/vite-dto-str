import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const CheckboxExample: React.FC = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleChange} />}
      label="Checkbox"
    />
  );
};

export default CheckboxExample;
