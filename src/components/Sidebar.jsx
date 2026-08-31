import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCalendar, FiUsers, FiPlusCircle, FiCheckSquare } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <FiHome /> },
    { name: 'Browse Events', path: '/events', icon: <FiCalendar /> },
    { name: 'Hosted Events', path: '/hosted', icon: <FiUsers /> },
    { name: 'Joined Events', path: '/joined', icon: <FiCheckSquare /> },
    { name: 'Create Event', path: '/createevent', icon: <FiPlusCircle /> },
  ];

  return (
    <div className="sticky top-16 z-[1000] w-full bg-[var(--surface)] border-b border-[var(--border)] overflow-x-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ul className="flex items-center space-x-2 py-3 overflow-x-auto hide-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className="shrink-0">
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${isActive
                      ? 'bg-[var(--primary)] text-white shadow-md shadow-blue-500/20'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg)] hover:text-[var(--primary)]'
                    }`}
                >
                  <span className={`text-lg ${isActive ? 'text-white' : 'text-[var(--text-secondary)]'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;