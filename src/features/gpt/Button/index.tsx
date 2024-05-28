import React from "react";
import Button from "./Mui";
import { Notifications } from "@mui/icons-material";

const ButtonShowcase: React.FC = () => {
  return (
    <div>
      <h2>Buttons</h2>
      <div className="button-group">
        <Button variant="contained" color="primary" label="Primary Button" />
        <Button variant="outlined" color="secondary" label="Secondary Button" />
        <Button variant="text" label="Text Button" />
        <Button variant="contained" color="success" label="Success Button" />
        <Button variant="outlined" color="error" label="Error Button" />
        <Button variant="contained" color="info" label="Info Button" />
        <Button variant="contained" color="warning" label="Warning Button" />
        <Button variant="contained" disabled label="Disabled Button" />
        <Button
          variant="contained"
          startIcon={<Notifications />}
          label="Icon Button"
        />
      </div>
    </div>
  );
};

export default ButtonShowcase
