import React, { useState } from "react";
import "./Components.css";
import Button from "../../../shared/gpt/Button/Button";
import Modal from "../../../shared/gpt/Modal/Modal";
import LayoutGPT from "../../../widgets/gpt/LayoutGPT";

const Components: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <LayoutGPT>
      <div className="components-page">
        <h1>UI Components</h1>
        <section>
          <h2>Button</h2>
          <Button label="Open Modal" onClick={handleButtonClick} />
        </section>
        <section>
          <h2>Modal</h2>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <p>
              This is a modal dialog. Click the close button or outside to
              dismiss.
            </p>
          </Modal>
        </section>
      </div>
    </LayoutGPT>
  );
};

export default Components;
