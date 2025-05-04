import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './Dropdown.css';

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<{ value: string; name: string; }>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, value, onChange }) => {
  return (
    <FormControl variant="outlined" className="dropdown">
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
