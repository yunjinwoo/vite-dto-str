import BentoMenuSample from "@features/gpt/BentoMenu";
import BreadcrumbSample from "@features/gpt/Breadcrumb";
import { uiElements } from "@features/gpt/uiElements";
import LayoutGPT from "@widgets/gpt/LayoutGPT";
import Sidebar from "@widgets/gpt/Sidebar";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./Components.css";

const Components: React.FC = () => {
  return (
    <LayoutGPT>
      <Sidebar />
      <div className="components-page">
        <div className="components-content">
          <h1>UI Components</h1>
          <BreadcrumbSample />

          <Routes>
            {uiElements.map((element) => (
              <Route
                key={element.path}
                path={element.path}
                element={element.component}
              />
            ))}
            <Route path="/" element={<BentoMenuSample />} />
          </Routes>
        </div>
      </div>
    </LayoutGPT>
  );
};

export default Components;
