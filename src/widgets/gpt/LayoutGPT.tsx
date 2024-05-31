import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutGPT: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <nav className="layout-nav">
          <ul>
            <li>
              <Link to="/">vite</Link>
            </li>
            <li>
              <Link to="/gpt">Home</Link>
            </li>
            <li>
              <Link to="/gpt/components">Components</Link>
            </li>
            <li>
              <Link to="/gpt/documentation">Documentation</Link>
            </li>
            <li>
              <Link to="/gpt/community">Community</Link>
            </li>
            <li>
              <Link to="/gpt/blog">Blog</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="layout-main">
        {children}
      </main>
      <footer className="layout-footer">
        <p>© 2024 My UI Library</p>
      </footer>
    </div>
  );
};

export default LayoutGPT;
