import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import BentoMenuSample from '@features/gpt/BentoMenu';

/**
 * 링크 거는거 새롭네..
 * 한곳에서 처리할필요는 없나보네?;;;
 * 
 */
const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Components</h2>
      <ul>
        {/*         
        <li><Link to="/gpt/components/accordion">Accordion</Link></li>
        <li><Link to="/gpt/components/button">Button</Link></li>
        <li><Link to="/gpt/components/modal">Modal</Link></li> */}
        
        <li><NavLink to="accordion">Accordion</NavLink></li>
        <li><NavLink to="button">Button</NavLink></li>
        <li><NavLink to="ButtonShowcase">ButtonShowcase</NavLink></li>
        <li><NavLink to="modal">Modal</NavLink></li>
        <li><NavLink to="BentoMenu">BentoMenu</NavLink></li>
        <li><NavLink to="DropdownShowcase">DropdownShowcase</NavLink></li>
        
        {/* 추가적인 UI 요소들을 여기에 추가합니다 */}
      </ul>
    </div>
  );
};

export default Sidebar;
