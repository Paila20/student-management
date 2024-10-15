import React, { useState } from 'react';

interface StudentTableProps {
  students: Student[];
  deleteStudent: (id: number) => void;
  editStudent: (student: Student) => void;
}

interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
  enrollmentStatus: boolean;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, deleteStudent, editStudent }) => {
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      editStudent(editingStudent);
      setEditingStudent(null);
    }
  };

  return (
    <div>
      <table className="table w-full border-collapse  ">
        <thead>
          <tr>
            <th className="border p-1 sm: text-xs">ID</th>
            <th className="border p-1 sm: text-xs">Name</th>
            <th className="border p-1 sm: text-xs">Age</th>
            <th className="border p-1 sm: text-xs">Grade</th>
            <th className="border p-1 sm: text-xs">Enrollment Status</th>
            <th className="border p-1 sm: text-xs">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border  text-center sm:p-0">{student.id}</td>
              <td className="border  text-center sm:p-0">{student.name}</td>
              <td className="border text-center sm:p-0">{student.age}</td>
              <td className="border  text-center sm:p-0">{student.grade}</td>
              <td className="border text-center sm:p-0">{student.enrollmentStatus ? 'Active' : 'Inactive'}</td>
              <td className="border text-center sm:p-0">
                <button onClick={() => handleEdit(student)} className="bg-yellow-500 text-white text-xs p-0 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => deleteStudent(student.id)} className="bg-red-500 text-white text-xs p-0 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingStudent && (
        <form onSubmit={handleUpdate} className="mt-4 space-y-4">
          <h2 className="text-xl font-bold">Edit Student</h2>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={editingStudent.name}
              onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              value={editingStudent.age}
              onChange={(e) => setEditingStudent({ ...editingStudent, age: Number(e.target.value) })}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Grade:</label>
            <select
              value={editingStudent.grade}
              onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })}
              className="border p-2 w-full"
            >
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
                checked={editingStudent.enrollmentStatus}
                onChange={() => setEditingStudent({ ...editingStudent, enrollmentStatus: !editingStudent.enrollmentStatus })}
              />
              Active Enrollment
            </label>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default StudentTable;
