import { useState, useEffect } from 'react';
import { X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentForm = ({ isOpen, onClose, onSubmit, initialData, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '', age: '', course: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
       <div className="relative z-50">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
           onClick={onClose}
        />

        <div className="fixed inset-0 z-10 overflow-y-auto">
           <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
             <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
             >
                <div className="px-6 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                   <h3 className="text-lg font-semibold leading-6 text-gray-900">
                     {initialData ? 'Edit Student Details' : 'Add New Student'}
                   </h3>
                   <button
                     onClick={onClose}
                     className="rounded-full p-1 bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-500 transition-colors"
                   >
                     <X className="h-5 w-5" />
                   </button>
                </div>
                
                <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
                   <div>
                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                     <input
                       type="text"
                       name="name"
                       id="name"
                       required
                       value={formData.name}
                       onChange={handleChange}
                       className="block w-full rounded-lg border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3"
                       placeholder="e.g. John Doe"
                     />
                   </div>



                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <input
                          type="number"
                          name="age"
                          id="age"
                          required
                          value={formData.age}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3"
                          placeholder="e.g. 21"
                        />
                      </div>
                      <div>
                        <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                        <input
                          type="text"
                          name="course"
                          id="course"
                          required
                          value={formData.course}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3"
                          placeholder="e.g. Computer Science"
                        />
                      </div>
                   </div>

                   <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                            Processing...
                          </>
                        ) : (
                          initialData ? 'Save Changes' : 'Create Student'
                        )}
                      </button>
                   </div>
                </form>
             </motion.div>
           </div>
        </div>
       </div>
    </AnimatePresence>
  );
};

export default StudentForm;
