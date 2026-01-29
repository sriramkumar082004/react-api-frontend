import { useState, useEffect } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../api/students';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import PageTransition from '../components/PageTransition'; // Imported
import { Plus, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch students. Ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddClick = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        toast.success('Student deleted successfully');
        fetchStudents();
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete student');
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      if (editingStudent) {
        await updateStudent(editingStudent.id, formData);
        toast.success('Student updated successfully');
      } else {
        await createStudent(formData);
        toast.success('Student created successfully');
      }
      setIsModalOpen(false);
      fetchStudents();
    } catch (error) {
      console.error(error);
      toast.error(editingStudent ? 'Failed to update student' : 'Failed to create student');
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Students Directory</h1>
           <p className="mt-1 text-sm text-gray-500">Manage your student records, admissions, and details.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors w-full sm:w-auto"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Student
        </button>
      </div>

      <StudentList
        students={students}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <StudentForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingStudent}
        isSubmitting={isSubmitting}
      />
    </PageTransition>
  );
};

export default StudentsPage;
