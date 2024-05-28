import { useState } from "react";
import Dropdown from "./Dropdown";

const DropdownShowcase: React.FC = () => {
    const [dropdownValue, setDropdownValue] = useState<string>('Option 1');
  
    return (
      <div>
        <h2>Dropdown</h2>
        <Dropdown
          label="Select an option"
          options={['Option 1', 'Option 2', 'Option 3']}
          value={dropdownValue}
          onChange={(event)=>setDropdownValue(event.target.value)}
        />
      </div>
    );
  };
  
  export default DropdownShowcase;