import { X } from 'lucide-react'
import React from 'react'

const LocationModal = ({
  handleCloseModal,
  isEditing,
  modalData,
  handleCreate,
  handleUpdate,
  handleModalInputChange
}) => {
  return (
    <div className="fixed inset-0 bg-opacity-5 backdrop-blur-[5px] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 border border-gray-400">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Edit Location' : 'Add New Location'}
          </h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
            <input
              type="text"
              value={modalData.locationName}
              onChange={(e) => handleModalInputChange('locationName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter location name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              value={modalData.address}
              onChange={(e) => handleModalInputChange('address', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
              placeholder="Enter address..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={isEditing ? handleUpdate : handleCreate}
            disabled={!modalData.locationName.trim() || !modalData.address.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isEditing ? 'Save' : 'Add Location'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LocationModal
