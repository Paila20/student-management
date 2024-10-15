import React, { useState, useEffect } from 'react';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import FilterAndSearch from './components/FilterAndSearch';

interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
  enrollmentStatus: boolean;
}

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name'); // Default sorting by name

  useEffect(() => {
    const storedData = localStorage.getItem('students');
    if (storedData) {
      setStudents(JSON.parse(storedData));
    }
  }, []);

  const updateLocalStorage = (students: Student[]) => {
    localStorage.setItem('students', JSON.stringify(students));
  };

  const addStudent = (newStudent: Student) => {
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    updateLocalStorage(updatedStudents);
  };

  const deleteStudent = (id: number) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    updateLocalStorage(updatedStudents);
  };

  const editStudent = (updatedStudent: Student) => {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedStudents);
    updateLocalStorage(updatedStudents);
  };

  // Apply filtering and sorting
  const filteredAndSortedStudents = students
    .filter((student) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && student.enrollmentStatus) ||
        (filter === 'inactive' && !student.enrollmentStatus);

      const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter;

      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesGrade && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'age') {
        return a.age - b.age;
      } else if (sortBy === 'grade') {
        return a.grade.localeCompare(b.grade);
      }
      return 0;
    });

  return (
    <div className="container mx-auto p-2 w-full sm:w-[70%]">
      <h1 className="text-3xl font-bold text-center mb-4">Student Record Management</h1>
      <StudentForm addStudent={addStudent} />
      <FilterAndSearch
        setFilter={setFilter}
        setSearchTerm={setSearchTerm}
        setGradeFilter={setGradeFilter}
        setSortBy={setSortBy}
      />
      <StudentTable
        students={filteredAndSortedStudents}
        deleteStudent={deleteStudent}
        editStudent={editStudent}
      />
    </div>
  );
};

export default App;
