import React from "react";
import { useNavigate } from "react-router-dom";
import DokaLogo from "./DokaLogo";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <header
      className={`bg-gradient-to-r from-doka-yellow/95 to-amber-400/95 backdrop-blur-md shadow-2xl border-b border-white/20 ${className}`}
    >
      <div className="container mx-auto px-6 py-4">
        <DokaLogo onClick={() => navigate("/")} />
      </div>
    </header>
  );
};

export default Header;
