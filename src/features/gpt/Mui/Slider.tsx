import { Slider, Typography } from '@mui/material';
import React, { useState } from 'react';

const CustomSlider: React.FC = () => {
  const [value, setValue] = useState<number[]>([20, 40]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(event.target)
    setValue(newValue as number[]);
  };

  return (
    <div>
      <Typography gutterBottom>Slider</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    </div>
  );
};

export default CustomSlider;
