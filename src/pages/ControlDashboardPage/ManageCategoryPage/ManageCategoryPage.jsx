import React, { useState } from 'react';
import {
  Plus, Edit, Trash2, Search,
  ChevronLeft, ChevronRight, X
} from 'lucide-react';
import {
  createCategory, deleteCategory,
  editCategory
} from '../../../services/apiServices';
import toast from 'react-hot-toast';
import { useDropdownContext } from '../../../contexts/DropdownContext';
import { useNavigate } from 'react-router-dom';

const ManageCategoryPage = () => {
  const { categories, refreshDropdown } = useDropdownContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modalData, setModalData] = useState({
    categoryName: '',
    description: '',
    usefulLifeYears: '',
    depreciationRate: '',
    categoryId: null
  });

  const handleOpenModal = () => {
    setIsEditing(false);
    setModalData({
      categoryName: '',
      description: '',
      usefulLifeYears: '',
      depreciationRate: '',
      categoryId: null
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (cat) => {
    setIsEditing(true);
    setModalData({
      categoryName: cat.categoryName,
      description: cat.description,
      usefulLifeYears: cat.usefulLifeYears,
      depreciationRate: cat.depreciationRate,
      categoryId: cat.categoryId
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
  };

  const handleModalChange = (field, value) => {
    setModalData(prev => ({ ...prev, [field]: value }));
  };

  const validateInputs = () => {
    const { categoryName, description, usefulLifeYears, depreciationRate } = modalData;
    return categoryName.trim() && description.trim() &&
      usefulLifeYears && depreciationRate && !isNaN(depreciationRate);
  };

  const handleCreate = async () => {
    if (!validateInputs()) {
      toast.error("All fields are required and must be valid");
      return;
    }
    try {
      const res = await createCategory({
        categoryName: modalData.categoryName.trim(),
        description: modalData.description.trim(),
        usefulLifeYears: modalData.usefulLifeYears,
        depreciationRate: Number(modalData.depreciationRate)
      });
      toast.success(res || "Category created");
      handleCloseModal();
      refreshDropdown("categories");
    } catch (err) {
      toast.error(err.message || "Error creating category");
    }
  };

  const handleUpdate = async () => {
    if (!validateInputs()) {
      toast.error("All fields are required and must be valid");
      return;
    }
    try {
      const res = await editCategory(modalData.categoryId, {
        categoryName: modalData.categoryName.trim(),
        description: modalData.description.trim(),
        usefulLifeYears: modalData.usefulLifeYears,
        depreciationRate: Number(modalData.depreciationRate)
      });
      toast.success(res || "Category updated");
      handleCloseModal();
      refreshDropdown("categories");
    } catch (err) {
      toast.error(err.message || "Failed to update category");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await deleteCategory(id);
      toast.success(res || "Category deleted successfully");
      refreshDropdown("categories");
    } catch (error) {
      toast.error(error.message || "Failed to delete category");
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cat.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg">

        <div className="py-4 border-b border-gray-200 flex flex-col lg:flex-row lg:justify-between items-center gap-4">
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 h-12 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleOpenModal}
            className="h-12 px-4 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={20} /> Add Category
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Useful Life (yrs)</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Depreciation Rate</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {currentCategories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No categories found
                  </td>
                </tr>
              ) : currentCategories.map(cat => (
                <tr onClick={() => navigate(`/manage-categories/${cat.categoryId}`, { state: cat })} key={cat.categoryId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{cat.categoryName}</td>
                  <td className="px-6 py-4">{cat.description}</td>
                  <td className="px-6 py-4">{cat.usefulLifeYears}</td>
                  <td className="px-6 py-4">{cat.depreciationRate}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditModal(cat);
                      }}
                      className="text-blue-600 hover:text-blue-900 p-1">
                      <Edit size={16} />
                    </button>
                    <button onClick={(e) =>{ e.stopPropagation(); handleDelete(cat.categoryId)}} className="text-red-600 hover:text-red-900 p-1">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing {indexOfFirst + 1}–{Math.min(indexOfLast, filteredCategories.length)} of {filteredCategories.length}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1 border rounded disabled:opacity-50">
                <ChevronLeft size={16} /> Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'border'}`}>
                  {page}
                </button>
              ))}
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1 border rounded disabled:opacity-50">
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {isEditing ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Category Name</label>
                <input type="text" value={modalData.categoryName}
                  onChange={e => handleModalChange('categoryName', e.target.value)}
                  className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea value={modalData.description}
                  onChange={e => handleModalChange('description', e.target.value)}
                  className="w-full border px-3 py-2 rounded" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Useful Life (years)</label>
                  <input type="number" min="1" step="1"
                    value={modalData.usefulLifeYears}
                    onChange={e => handleModalChange('usefulLifeYears', e.target.value)}
                    className="w-full border px-3 py-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Depreciation Rate</label>
                  <input type="number" min="0" max="1" step="0.01"
                    value={modalData.depreciationRate}
                    onChange={e => handleModalChange('depreciationRate', e.target.value)}
                    className="w-full border px-3 py-2 rounded" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
                Cancel
              </button>
              <button onClick={isEditing ? handleUpdate : handleCreate}
                disabled={!validateInputs()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                {isEditing ? 'Save' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategoryPage;
