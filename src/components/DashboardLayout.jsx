import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 relative">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-400/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-400/20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <Sidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-y-auto focus:outline-none p-4 md:p-8 scroll-smooth" id="main-content">
          <div className="max-w-7xl mx-auto h-full">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
