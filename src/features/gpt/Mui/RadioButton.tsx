import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const RadioButton: React.FC = () => {
  const [value, setValue] = useState('option1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Radio Button Group</FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
        <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
        <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButton;
