import React from 'react';

interface FilterAndSearchProps {
  setFilter: (filter: string) => void;
  setSearchTerm: (term: string) => void;
  setGradeFilter: (grade: string) => void;
  setSortBy: (sortBy: string) => void;
}

const FilterAndSearch: React.FC<FilterAndSearchProps> = ({
  setFilter,
  setSearchTerm,
  setGradeFilter,
  setSortBy,
}) => {
  return (
    <div className="flex space-x-4 mb-4 w-full  ">
      
      <select onChange={(e) => setFilter(e.target.value)} className="border w-[20%] sm:text-xs">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>


      <select onChange={(e) => setGradeFilter(e.target.value)} className="border w-[20%] sm:text-xs">
        <option value="all"> Grades</option>
        <option value="A">Grade A</option>
        <option value="B">Grade B</option>
        <option value="C">Grade C</option>
        <option value="D">Grade D</option>
        <option value="F">Grade F</option>

      </select>

      <select onChange={(e) => setSortBy(e.target.value)} className="border   w-[20%] sm:text-xs">
        <option value="name">Sort by Name</option>
        <option value="age">Sort by Age</option>
        <option value="grade">Sort by Grade</option>
      </select>

     
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border  w-[40%]"
      />
    </div>
  );
};

export default FilterAndSearch;
