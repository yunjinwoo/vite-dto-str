import React, { useState } from "react";
import Modal from "@shared/gpt/Modal/Modal";

const ModalTest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      children={<p>Modal content</p>}
    />
  );
};

export default ModalTest;
