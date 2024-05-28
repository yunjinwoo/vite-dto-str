import React from "react";
import Accordion from "./Accordion";

const AccordionSample: React.FC = () => {
  const accordionItems = [
    {
      title: "Section 1",
      content: "Content for section 1",
    },
    {
      title: "Section 2",
      content: "Content for section 2",
    },
    {
      title: "Section 3",
      content: "Content for section 3",
    },
  ];

  return (
    <section>
      <h2>Accordion</h2>
      <Accordion items={accordionItems} />
    </section>
  );
};

export default AccordionSample;
