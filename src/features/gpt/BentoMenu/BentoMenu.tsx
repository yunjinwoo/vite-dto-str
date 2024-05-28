import React from "react";
import "./BentoMenu.css";
import { NavLink, useNavigate } from "react-router-dom";

interface BentoMenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

interface BentoMenuProps {
  items: BentoMenuItem[];
}

const BentoMenu: React.FC<BentoMenuProps> = ({ items }) => {
  // <NavLink to={item.link}></NavLink>
  const navi = useNavigate();
  return (
    <div className="bento-menu">
      {items.map((item, index) => (
        <a onClick={()=>navi(item.link)} href={"#"} key={index} className="bento-menu-item">
          <div className="bento-menu-icon">{item.icon}</div>
          <div className="bento-menu-content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default BentoMenu;
