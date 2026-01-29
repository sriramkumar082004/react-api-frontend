import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Image, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Students', href: '/students', icon: Users },
    { name: 'Aadhaar Extraction', href: '/aadhaar', icon: FileText },
    { name: 'Background Removal', href: '/bg-removal', icon: Image },
  ];

  const sidebarVariants = {
    expanded: { width: "18rem", transition: { duration: 0.3, ease: "easeInOut" } },
    collapsed: { width: "5rem", transition: { duration: 0.3, ease: "easeInOut" } }
  };

  return (
    <motion.div 
      className="hidden md:flex md:flex-shrink-0 h-full relative z-40"
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
    >
      <div className="flex flex-col h-full bg-white border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] overflow-hidden relative">
        
        {/* Toggle Button - Integrated */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 z-50 bg-white border border-slate-200 rounded-full p-1.5 shadow-sm hover:shadow-md hover:scale-110 transition-all text-slate-400 hover:text-primary-600"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Logo Section */}
        <div className="flex items-center h-20 px-6">
          <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center w-full' : 'space-x-3'}`}>
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20 flex-shrink-0">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="whitespace-nowrap"
                >
                  <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                    Student<span className="text-primary-600">Sys</span>
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col px-3 py-6 space-y-1.5 overflow-y-auto">
          {!isCollapsed && (
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Dashboard
            </p>
          )}
          
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`relative group flex items-center px-3 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Icon
                  className={`flex-shrink-0 h-4.5 w-4.5 transition-colors duration-200 ${
                    isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-500'
                  } ${!isCollapsed ? 'mr-3' : ''}`}
                />
                
                {!isCollapsed && (
                  <span className="truncate tracking-tight">{item.name}</span>
                )}
                
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute right-0 w-1 h-5 bg-primary-500 rounded-l-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action / Logout */}
        <div className="p-4 mt-auto">
          <button 
            onClick={logout}
            className={`flex items-center w-full px-3 py-2.5 text-sm font-bold text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 group ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut className={`h-4.5 w-4.5 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && <span className="truncate">Sign Out</span>}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
