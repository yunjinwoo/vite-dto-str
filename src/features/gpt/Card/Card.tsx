import React from "react";
import {
  Card as MuiCard,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import "./Card.css";

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <MuiCard className="card">
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </CardActions>
    </MuiCard>
  );
};

export default Card;
