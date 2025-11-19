import React, { useState } from "react";
import { Edit, Trash2, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import { deleteUser, editUserRole } from "../services/apiServices";
import { useUserContext } from "../contexts/UserContext";
import ConfirmModal from "./ConfirmModal";

const UsersTable = () => {
  const { users, fetchAllUsers, loading } = useUserContext();
  const [editingUser, setEditingUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [editedUsername, setEditedUsername] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user.username);
    setSelectedRole(user.role);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setSelectedRole("");
  };

  const closeModal = () => {
    setConfirmAction(null);
    setShowEditModal(false);
    handleCancel();
    setUserId("");
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const res = await editUserRole({
        username: editedUsername,
        role: selectedRole,
      });
      toast.success(res);
      await fetchAllUsers();
    } catch (error) {
      console.log(error);
      toast.error(error || "Failed to update role");
    } finally {
      setEditingUser(null);
      setIsLoading(false);
      setShowEditModal(false);
      setEditedUsername(null);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteUser(userId);
      toast.success("User deleted successfully");
      await fetchAllUsers();
    } catch (error) {
      toast.error(error || "Failed to delete user");
    } finally {
      setIsLoading(false);
      setShowEditModal(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-6">Loading users...</div>
    );
  }

  if (!users?.length) {
    return (
      <div className="text-center text-gray-500 py-6">No users found.</div>
    );
  }

  return (
    <div className="mt-10 bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-[#00B0F0] text-white">
          <tr>
            <th className="text-left py-3 px-4">Email</th>
            <th className="text-left py-3 px-4">Role</th>
            <th className="text-center py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(
            (user, idx) => (
              console.log(user),
              (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">
                    {editingUser === user.username ? (
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00B0F0] outline-none"
                      >
                        <option value="">Select role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="AUDITOR">Audit</option>
                        <option value="FINANCE">Finance</option>
                        <option value="IT_SUPPORT">IT Support</option>
                        <option value="CORPORATE_SERVICE">
                          Corporate Service
                        </option>
                        <option value="INTERNAL_CONTROL">
                          Internal Control
                        </option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="py-3 px-4 text-center flex items-center justify-center gap-4">
                    {editingUser === user.username ? (
                      <>
                        <button
                          onClick={() => {
                            setShowEditModal(true);
                            setConfirmAction("edit");
                            setEditedUsername(user.username);
                          }}
                          className="text-green-600 hover:text-green-800 cursor-pointer transition"
                        >
                          <Save size={18} />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            handleEdit(user);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setShowEditModal(true);
                            setConfirmAction("delete");
                            setUserId(user.employeeId);
                          }}
                          className="text-red-600 hover:text-red-800 transition cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
      <ConfirmModal
        isOpen={showEditModal}
        title={confirmAction == "edit" ? "Edit User" : "Delete User"}
        message={
          confirmAction == "edit"
            ? `Are you sure you want to edit ${editedUsername} role?`
            : "Are you sure you want to delete user?"
        }
        onConfirm={confirmAction == "edit" ? handleSave : handleDelete}
        onCancel={closeModal}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UsersTable;
