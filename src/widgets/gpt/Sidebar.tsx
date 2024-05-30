import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { uiElements } from "@features/gpt/uiElements";
import { Alert } from "@mui/material";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Components</h2>
      <h4><a href="https://velog.io/@oneook/프론트엔드-개발자라면-반드시-알아두어야-할-32가지의-UI-요소-번역" target="_blank">[참고링크]</a></h4>
      <ol>
        {uiElements.map((element) => (
          <li key={element.path}>
            <NavLink to={element.path}>{element.name}</NavLink>
          </li>
        ))}
      </ol>

      <Alert>32중 여기까지...</Alert>
    </div>
  );
};

export default Sidebar;
