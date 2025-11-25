import React from 'react';
import { useNavigate } from 'react-router-dom';
import DokaLogo from './DokaLogo';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-doka-yellow to-amber-400 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <DokaLogo onClick={() => navigate('/')} />
      </div>
    </header>
  );
};

export default Header;
