import React from "react";
import LayoutGPT from "@widgets/gpt/LayoutGPT";
import Timer from "@features/gpt/Timer";
const Home: React.FC = () => {
  return (
    <LayoutGPT>
      <div>
        <h1>Welcome to My UI Library</h1>
        <p>This is the homepage.</p>

        
        <p>Test page.</p>
        <Timer />
      </div>
    </LayoutGPT>
  );
};

export default Home;
