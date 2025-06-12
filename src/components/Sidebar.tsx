import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plus, 
  FolderPlus, 
  Clock, 
  FileText, 
  ChevronDown, 
  ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isCreateActive = () => 
    location.pathname === '/create-initiative' || location.pathname === '/create-project';

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      id: 'delay',
      label: 'Delay Management',
      icon: Clock,
      path: '/delay-management',
    },
    {
      id: 'reports',
      label: 'Report Page',
      icon: FileText,
      path: '/reports',
    }
  ];

  const createItems = [
    {
      id: 'create-initiative',
      label: 'Create Initiative',
      icon: Plus,
      path: '/create-initiative'
    },
    {
      id: 'create-project',
      label: 'Create Project',
      icon: FolderPlus,
      path: '/create-project'
    }
  ];

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-slate-900 shadow-2xl z-50 transition-all duration-300 ease-in-out ${isOpen ? 'w-80 translate-x-0 opacity-100' : 'w-0 -translate-x-full opacity-0'}`}>
      {/* Header */}
      <div className="relative p-4 bg-slate-800">
        <div className="relative z-10">
          <h1 className="text-xl font-bold text-white mb-1 tracking-wide">
            Project Hub
          </h1>
          <p className="text-slate-300 text-xs opacity-90">
            Initiative & Project Management
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-4">
        {/* Regular Menu Items */}
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`
                group relative w-full p-3 rounded-xl transition-all duration-300 block
                ${active 
                  ? 'bg-blue-600 shadow-lg scale-105 translate-x-2' 
                  : 'bg-slate-800/50 hover:bg-slate-700/50 hover:translate-x-1 hover:shadow-lg'
                }
                border border-slate-700/50 hover:border-slate-600/50
                backdrop-blur-sm
              `}
            >
              <div className="relative flex items-center space-x-3">
                <div className={`
                  p-2 rounded-lg transition-all duration-300
                  ${active 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-700/50 text-slate-300 group-hover:bg-slate-600/50 group-hover:text-white'
                  }
                `}>
                  <Icon size={20} />
                </div>

                <div className="flex-1 text-left">
                  <h3 className={`
                    font-semibold transition-colors duration-300
                    ${active ? 'text-white' : 'text-slate-200 group-hover:text-white'}
                  `}>
                    {item.label}
                  </h3>
                </div>

                <ChevronRight 
                  size={16} 
                  className={`
                    transition-all duration-300 transform
                    ${active 
                      ? 'text-white translate-x-1 opacity-100' 
                      : 'text-slate-400 group-hover:text-white group-hover:translate-x-1'
                    }
                  `}
                />
              </div>

              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
              )}
            </Link>
          );
        })}

        {/* Create Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCreateOpen(!isCreateOpen)}
            className={`
              group relative w-full p-3 rounded-xl transition-all duration-300
              ${isCreateActive() 
                ? 'bg-emerald-600 shadow-lg scale-105 translate-x-2' 
                : 'bg-slate-800/50 hover:bg-slate-700/50 hover:translate-x-1 hover:shadow-lg'
              }
              border border-slate-700/50 hover:border-slate-600/50
              backdrop-blur-sm
            `}
          >
            <div className="relative flex items-center space-x-3">
              <div className={`
                p-2 rounded-lg transition-all duration-300
                ${isCreateActive() 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-700/50 text-slate-300 group-hover:bg-slate-600/50 group-hover:text-white'
                }
              `}>
                <Plus size={20} />
              </div>

              <div className="flex-1 text-left">
                <h3 className={`
                  font-semibold transition-colors duration-300
                  ${isCreateActive() ? 'text-white' : 'text-slate-200 group-hover:text-white'}
                `}>
                  Create
                </h3>
              </div>

              <ChevronDown 
                size={16} 
                className={`
                  transition-all duration-300 transform
                  ${isCreateOpen ? 'rotate-180' : ''}
                  ${isCreateActive() 
                    ? 'text-white' 
                    : 'text-slate-400 group-hover:text-white'
                  }
                `}
              />
            </div>

            {isCreateActive() && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
            )}
          </button>

          {isCreateOpen && (
            <div className="mt-2 ml-4 space-y-2">
              {createItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`
                      group relative w-full p-3 rounded-lg transition-all duration-300 block
                      ${active 
                        ? 'bg-emerald-600 shadow-md scale-105' 
                        : 'bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1'
                      }
                      border border-slate-700/30 hover:border-slate-600/50
                    `}
                  >
                    <div className="relative flex items-center space-x-3">
                      <div className={`
                        p-1.5 rounded-md transition-all duration-300
                        ${active 
                          ? 'bg-white/20 text-white' 
                          : 'bg-slate-700/50 text-slate-300 group-hover:bg-slate-600/50 group-hover:text-white'
                        }
                      `}>
                        <Icon size={16} />
                      </div>

                      <h3 className={`
                        text-sm font-medium transition-colors duration-300
                        ${active ? 'text-white' : 'text-slate-200 group-hover:text-white'}
                      `}>
                        {item.label}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;