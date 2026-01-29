import { Users, FileText, Image, Activity, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const DashboardPage = () => {
  const stats = [
    { name: 'Total Students', value: '2,543', change: '+12.5%', icon: Users, color: 'bg-indigo-500' },
    { name: 'Aadhaar Extracted', value: '1,234', change: '+18.2%', icon: FileText, color: 'bg-green-500' },
    { name: 'Images Processed', value: '856', change: '-4.3%', icon: Image, color: 'bg-orange-500' },
    { name: 'Active Users', value: '42', change: '+2.1%', icon: Activity, color: 'bg-purple-500' },
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto space-y-10 py-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
            <p className="mt-2 text-slate-500 font-medium">Personalized insights and system health at a glance.</p>
          </div>
          <div className="flex items-center gap-2">
             <div className="flex bg-slate-200/50 p-1 rounded-xl">
                <button className="px-4 py-1.5 text-xs font-bold text-primary-700 bg-white rounded-lg shadow-sm">30 Days</button>
                <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors">90 Days</button>
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => {
             const Icon = item.icon;
             return (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-xl hover:shadow-primary-600/5 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`rounded-xl p-2.5 ${item.color.replace('bg-', 'bg-').replace('500', '50')} ${item.color.replace('bg-', 'text-').replace('500', '600')} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {item.change}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.name}</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">{item.value}</p>
                </div>
              </motion.div>
             );
          })}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-2xl p-8 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center">
                  <Activity className="w-5 h-5 mr-3 text-primary-600" />
                  Recent Activity
                </h3>
                <button className="text-xs font-bold text-primary-600 hover:underline">View All</button>
             </div>
             <div className="space-y-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-start gap-4 group cursor-pointer">
                    <div className="relative pt-1">
                      <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary-50 group-hover:border-primary-100 transition-colors">
                        <Users className="w-4 h-4 text-slate-400 group-hover:text-primary-600" />
                      </div>
                      {item !== 4 && <div className="absolute top-11 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-100"></div>}
                    </div>
                    <div className="flex-1 pb-6 border-b border-slate-50">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-primary-600 transition-colors">Student onboarding completed</p>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase">2h ago</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">New record created for <span className="text-slate-700 font-bold">Arjun Sharma</span> by system.</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group">
               <div className="relative z-10">
                 <h3 className="text-lg font-bold mb-2">Ready to expand?</h3>
                 <p className="text-slate-400 text-sm mb-6 leading-relaxed">Boost your productivity with our advanced AI tools.</p>
                 <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors active:scale-95">
                   Explore Features
                 </button>
               </div>
               <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-colors"></div>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
               <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Quick Actions</h3>
               <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Add Student', icon: Users, color: 'primary' },
                    { label: 'Scan ID', icon: FileText, color: 'secondary' },
                    { label: 'Remove BG', icon: Image, color: 'emerald' },
                    { label: 'Reports', icon: TrendingUp, color: 'amber' }
                  ].map((btn) => {
                    const BIcon = btn.icon;
                    return (
                      <button key={btn.label} className="flex flex-col items-center justify-center p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all group">
                         <div className="p-2 mb-2 rounded-lg bg-slate-50 group-hover:bg-white group-hover:shadow-sm transition-all">
                           <BIcon className="w-5 h-5 text-slate-400 group-hover:text-primary-600" />
                         </div>
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{btn.label}</span>
                      </button>
                    );
                  })}
               </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default DashboardPage;
