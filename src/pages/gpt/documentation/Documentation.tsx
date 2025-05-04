// src/pages/Documentation.tsx
import React from 'react';
import BreadcrumbSample from '@features/gpt/Breadcrumb';
import './Documentation.css';

const Documentation: React.FC = () => {
  return (
    <div className="documentation-page">
      <h1>Documentation</h1>
      <BreadcrumbSample />
      <div className="documentation-content">
        <h2>Getting Started</h2>
        <p>Welcome to our documentation. Here you'll find everything you need to know about our components and how to use them.</p>
        
        <h2>Installation</h2>
        <pre>
          <code>
            npm install @your-package-name
          </code>
        </pre>

        <h2>Usage</h2>
        <p>Import the components you need and start using them in your application.</p>
      </div>
    </div>
  );
};

export default Documentation;
