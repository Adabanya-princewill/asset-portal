import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { createDepartment, deleteDepartment, editDepartment, getDepartments } from '../../../services/apiServices';
import toast from 'react-hot-toast';


const ManageDepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editName, setEditName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Load departments on component mount
  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.reverse());
    } catch (err) {
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newDepartmentName.trim()) return;
    try {
      const payload = { departmentName: newDepartmentName.trim() };
      await createDepartment(payload);
      toast.success("Department created");
      setNewDepartmentName('');
      loadDepartments();
    } catch (err) {
      toast.error(err.message || "Error creating department");
    }
  };


  const handleEdit = async (department) => {
    if (editingDepartment && editingDepartment.departmentId === department.departmentId) {
      // Save changes
      if (!editName.trim()) return;

      try {
        await editDepartment(department.departmentId, {
          departmentName: editName.trim()
        });
        toast.success("Updated successfully");
        setEditingDepartment(null);
        loadDepartments();
      } catch (error) {
        toast.error(error.message || "Failed to update department");
        console.error('Error updating department:', error);
      }
    } else {
      // Start editing
      setEditingDepartment(department);
      setEditName(department.departmentName);
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(id);
        toast.success("department deleted successfully")
        await loadDepartments();
      } catch (error) {
        toast.error(error.message || "Failed to delete department");
        console.error('Error deleting department:', error);
      }
    }
  };

  const cancelEdit = () => {
    setEditingDepartment(null);
    setEditName('');
  };


  // Filter departments based on search
  const filteredDepartments = departments.filter(dept =>
    dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDepartments = filteredDepartments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg">
        <div className="py-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Add Department */}
            <div className="flex items-stretch gap-4 w-full lg:w-auto">
              <input
                type="text"
                placeholder="Enter department name..."
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleCreate)}
                className="px-4 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full lg:w-64"
              />
              <button
                onClick={handleCreate}
                disabled={!newDepartmentName.trim()}
                className="h-12 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus size={20} />
                Add Department
              </button>
            </div>
          </div>
        </div>


        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentDepartments.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No departments found
                  </td>
                </tr>
              ) : (
                currentDepartments.map((dept) => (
                  <tr key={dept.departmentId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingDepartment && editingDepartment.departmentId === dept.departmentId ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, () => handleEdit(dept))}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          autoFocus
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">
                          {dept.departmentName}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{dept.createdBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {editingDepartment && editingDepartment.departmentId === dept.departmentId ? (
                          <>
                            <button
                              onClick={() => handleEdit(dept)}
                              className="text-green-600 hover:text-green-900 p-1"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="text-gray-600 hover:text-gray-900 p-1"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(dept)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(dept.departmentId)}
                              className="text-red-600 hover:text-red-900 p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDepartments.length)} of {filteredDepartments.length} departments
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-sm rounded ${currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageDepartmentPage;