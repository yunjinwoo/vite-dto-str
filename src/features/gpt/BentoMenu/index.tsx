import React from "react";
import { ListAlt, Settings, Notifications } from "@mui/icons-material";
import BentoMenu from "./BentoMenu";

const BentoMenuSample: React.FC = () => {
  const bentoMenuItems = [
    {
      title: "Accordion",
      description: "Accordion component",
      icon: <ListAlt />,
      link: "accordion",
    },
    {
      title: "Button",
      description: "Button component",
      icon: <Notifications />,
      link: "button",
    },
    {
      title: "Modal",
      description: "Modal component",
      icon: <Settings />,
      link: "modal",
    },
  ];

  return <BentoMenu items={bentoMenuItems} />;
};

export default BentoMenuSample;
