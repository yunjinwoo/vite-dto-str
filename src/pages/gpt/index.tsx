import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Components from './components/Components';
import Documentation from './documentation/Documentation';
import LayoutGPT from '@widgets/gpt/LayoutGPT';

const GptComponents: React.FC = () => {
  return (
    <LayoutGPT>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components/*" element={<Components />} />
        <Route path="/documentation" element={<Documentation />} />
      </Routes>
    </LayoutGPT>
  );
};

export default GptComponents;
