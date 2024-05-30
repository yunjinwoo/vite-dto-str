import AccordionSample from "@features/gpt/Accordion";
import ModalTest from "@features/gpt/Modal";
import Button from "@shared/gpt/Button/Button";
import LayoutGPT from "@widgets/gpt/LayoutGPT";
import Sidebar from "@widgets/gpt/Sidebar";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./Components.css";
import BentoMenuSample from "@features/gpt/BentoMenu";
import BreadcrumbSample from "@features/gpt/Breadcrumb";
import ButtonShowcase from "@features/gpt/Button";
import DropdownShowcase from "@features/gpt/Dropdown";
import { uiElements } from "@features/gpt/uiElements";

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

          {/* <Routes>
            <Route path="accordion" element={<AccordionSample />} />
            <Route path="ButtonShowcase" element={<ButtonShowcase />} />
            <Route
              path="button"
              element={
                <Button
                  label="Test Button"
                  onClick={() => alert("Button clicked!")}
                />
              }
            />
            <Route path="modal" element={<ModalTest />} />
            <Route path="BentoMenu" element={<BentoMenuSample />} />
            <Route path="DropdownShowcase" element={<DropdownShowcase />} />

          </Routes> */}
        </div>
      </div>
    </LayoutGPT>
  );
};

export default Components;
