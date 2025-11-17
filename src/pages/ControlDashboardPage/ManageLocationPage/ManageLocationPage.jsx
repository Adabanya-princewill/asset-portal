import { useState } from 'react';
import { Plus, Edit, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { createLocation, deleteLocation, editLocation } from '../../../services/apiServices';
import toast from 'react-hot-toast';
import LocationModal from '../../../components/locationModal';
import { useDropdownContext } from '../../../contexts/DropdownContext';
import { useNavigate } from 'react-router-dom';

const ManageLocationPage = () => {
  const { locations, refreshDropdown } = useDropdownContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modalData, setModalData] = useState({
    locationName: '',
    address: '',
    locationId: null
  });

  const handleOpenModal = () => {
    setIsEditing(false);
    setModalData({ locationName: '', address: '', locationId: null });
    setShowModal(true);
  };

  const handleOpenEditModal = (location) => {
    setIsEditing(true);
    setModalData({
      locationName: location.locationName,
      address: location.address,
      locationId: location.locationId
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData({ locationName: '', address: '', locationId: null });
    setIsEditing(false);
  };

  const handleModalInputChange = (field, value) => {
    setModalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreate = async () => {
    if (!modalData.locationName.trim() || !modalData.address.trim()) {
      toast.error("Please fill in both location name and address");
      return;
    }

    try {
      const res = await createLocation({
        locationName: modalData.locationName.trim(),
        address: modalData.address.trim()
      });
      toast.success(res || "Location created");
      handleCloseModal();
      refreshDropdown("locations");
    } catch (err) {
      toast.error(err.message || "Error creating location");
    }
  };

  const handleUpdate = async () => {
    if (!modalData.locationName.trim() || !modalData.address.trim()) {
      toast.error("Please fill in both location name and address");
      return;
    }

    try {
      const res = await editLocation(modalData.locationId, {
        locationName: modalData.locationName.trim(),
        address: modalData.address.trim()
      });
      toast.success(res || "Location updated");
      handleCloseModal();
      refreshDropdown("locations");
    } catch (err) {
      toast.error(err.message || "Failed to update location");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      try {
        const res = await deleteLocation(id);
        toast.success(res || "Location deleted successfully");
        refreshDropdown("locations");
      } catch (error) {
        toast.error(error.message || "Failed to delete location");
      }
    }
  };

  const filteredLocations = locations.filter(loc =>
    loc.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLocations = filteredLocations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg">
        {/* Header */}
        <div className="py-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Add Location Button */}
            <div className="flex items-stretch gap-4 w-full lg:w-auto">
              <button
                onClick={handleOpenModal}
                className="h-12 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={20} />
                Add Location
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#00B0F0] font-bold text-[#000000]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-500 uppercase tracking-wider">
                  Location Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentLocations.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No locations found
                  </td>
                </tr>
              ) : (
                currentLocations.map((loc) => (
                  <tr onClick={() => navigate(`/manage-locations/${loc.locationId}`, { state: loc })} key={loc.locationId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {loc.locationName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {loc.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {e.stopPropagation(); handleOpenEditModal(loc)}}
                          className="text-blue-600 hover:text-blue-900 p-1"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={(e) => {e.stopPropagation(); handleDelete(loc.locationId)}}
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
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
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredLocations.length)} of {filteredLocations.length} locations
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

      {/* Modal */}
      {showModal && (
        <LocationModal
          handleCloseModal={handleCloseModal}
          isEditing={isEditing}
          modalData={modalData}
          handleModalInputChange={handleModalInputChange}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ManageLocationPage;
