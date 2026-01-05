import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }) => (
  `px-3 py-2 rounded text-sm font-medium ${
    isActive ? 'bg-black text-white' : 'text-gray-800 hover:bg-gray-100'
  }`
);

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-base font-semibold">입맛 MBTI</Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/" className={navLinkClass} end>메인</NavLink>
            <NavLink to="/taste-test" className={navLinkClass}>기본검사</NavLink>
            <NavLink to="/taste-detail" className={navLinkClass}>세부검사</NavLink>
          </nav>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className="mt-10 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-2xl mx-auto px-4 py-6 text-xs text-gray-500">
          © {new Date().getFullYear()} Taste MBTI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}


