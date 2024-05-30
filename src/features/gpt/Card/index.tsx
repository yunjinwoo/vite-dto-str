import React from "react";
import Card from "./Card";

const CardShowcase: React.FC = () => {
  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="card-showcase">
      <Card 
        title="Card Title 1" 
        description="This is a description for card 1." 
        buttonText="Learn More" 
        onButtonClick={handleButtonClick} 
      />
      <Card 
        title="Card Title 2" 
        description="This is a description for card 2." 
        buttonText="Learn More" 
        onButtonClick={handleButtonClick} 
      />
      <Card 
        title="Card Title 3" 
        description="This is a description for card 3." 
        buttonText="Learn More" 
        onButtonClick={handleButtonClick} 
      />
    </div>
  );
};


export default CardShowcase;
