import { Edit, Trash2, MoreVertical, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
      {/* Toolbar */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30">
         <div className="relative max-w-sm w-full group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
            </div>
            <input 
               type="text" 
               className="block w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500/40 transition-all" 
               placeholder="Search students..." 
            />
         </div>
         <div className="flex items-center gap-3">
            <button className="inline-flex items-center px-4 py-2 border border-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl text-slate-600 bg-white hover:bg-slate-50 transition-all">
               <Filter className="h-3.5 w-3.5 mr-2" />
               Filter
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{students.length} Total</span>
         </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead>
            <tr className="bg-slate-50/50">
              <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                Student Identity
              </th>
              <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                Age
              </th>
              <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                Assigned Course
              </th>
              <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                System Status
              </th>
              <th scope="col" className="relative px-6 py-4">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <AnimatePresence>
              {students.map((student, index) => (
                <motion.tr 
                  key={student.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all duration-300">
                           {student.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-slate-900 tracking-tight">{student.name}</div>
                        <div className="text-[11px] font-medium text-slate-400">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600 font-bold">{student.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight bg-primary-50 text-primary-700 border border-primary-100/50">
                        {student.course}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight bg-emerald-50 text-emerald-700 border border-emerald-100/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                       <button
                         onClick={() => onEdit(student)}
                         className="p-2 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-white border border-transparent hover:border-slate-100 transition-all"
                       >
                         <Edit className="h-4 w-4" />
                       </button>
                       <button
                         onClick={() => onDelete(student.id)}
                         className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white border border-transparent hover:border-slate-100 transition-all"
                       >
                         <Trash2 className="h-4 w-4" />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {students.length === 0 && (
           <div className="text-center py-24">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Search className="h-6 w-6 text-slate-300" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">No matching records</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">Try refining your search or add a new student.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
