// src/pages/Documentation.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import LayoutGPT from "@widgets/gpt/LayoutGPT";

const markdown = `
# Documentation
This is the documentation page.
`;

const Documentation: React.FC = () => {
  return (
    <LayoutGPT>
      <div>
        <h3>test1</h3>
        <ReactMarkdown children={markdown} />
        <h3>test2</h3>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </LayoutGPT>
  );
};

export default Documentation;
