import CheckboxExample from "./Checkbox";
import Checkboxes from "./Checkboxes";
import RadioButton from "./RadioButton";
import CustomSlider from "./Slider";
import ToggleSwitch from "./ToggleSwitch";

export default function () {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <a href="https://mui.com/material-ui/react-checkbox/" target="_blank">
        MUI
      </a>

      <Checkboxes />
      <ToggleSwitch />
      <RadioButton />
      <CustomSlider />
      <CheckboxExample />
    </div>
  );
}
