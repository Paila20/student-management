import React, { useState } from 'react';

interface StudentFormProps {
  addStudent: (student: Student) => void;
}
 
interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
  enrollmentStatus: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({ addStudent }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [grade, setGrade] = useState('A');
  const [enrollmentStatus, setEnrollmentStatus] = useState(true);
  const [error, setError] = useState<{ name: string; age: string }>({
    name: '',
    age: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

 
    setError({ name: '', age: '' });


    let valid = true;


    if (!name.trim()) {
      setError((prev) => ({ ...prev, name: 'Name is required' }));
      valid = false;
    }

    
    if (age === '' || isNaN(Number(age))) {
      setError((prev) => ({ ...prev, age: 'Age must be a valid number' }));
      valid = false;
    }

  
    if (valid) {
      const newStudent = {
        id: Date.now(),
        name,
        age: Number(age),
        grade,
        enrollmentStatus,
      };
      addStudent(newStudent); 
      resetForm(); 
    }
  };

  const resetForm = () => {
    setName('');
    setAge('');
    setGrade('A');
    setEnrollmentStatus(true);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4 w-full">
      <div>
        <label className="block">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`border p-2 w-full ${error.name ? 'border-red-500' : ''}`} 
        />
        {error.name && <p className="text-red-500">{error.name}</p>} 
      </div>
      <div>
        <label className="block">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
          className={`border p-2 w-full ${error.age ? 'border-red-500' : ''}`}
        />
        {error.age && <p className="text-red-500">{error.age}</p>} 
      </div>
      <div>
        <label className="block">Grade:</label>
        <select value={grade} onChange={(e) => setGrade(e.target.value)} className="border p-2 w-full">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={enrollmentStatus}
            onChange={() => setEnrollmentStatus(!enrollmentStatus)}
          />
          Active Enrollment
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Student
      </button>
    </form>
  );
};

export default StudentForm;
