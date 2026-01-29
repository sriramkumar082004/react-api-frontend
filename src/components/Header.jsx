import { useAuth } from '../context/AuthContext';
import { Bell, Search } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();
  
  return (
    <header className="sticky top-0 z-30 w-full px-6 py-4 bg-[#f8fafc]/80 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-focus-within:text-primary-600 transition-colors">
              <Search className="h-4 w-4" />
            </div>
            <input
              name="search"
              id="search"
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-200/40 border-transparent focus:bg-white focus:border-primary-500/30 focus:ring-4 focus:ring-primary-500/5 rounded-xl transition-all duration-200 placeholder:text-slate-400 focus:outline-none"
              placeholder="Quick search..."
              type="search"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-500 hover:text-primary-600 hover:bg-white rounded-xl transition-all duration-200 group">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-500 border-2 border-[#f8fafc] rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-800 tracking-tight leading-none mb-1">
                {user?.email?.split('@')[0]}
              </span>
              <span className="text-[10px] font-semibold text-primary-600 uppercase tracking-widest leading-none">
                Admin
              </span>
            </div>
            
            <div className="relative">
              <div className="h-9 w-9 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/20 ring-2 ring-white cursor-pointer hover:scale-105 transition-transform duration-200">
                <span className="font-bold text-xs">
                  {user?.email?.[0].toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
