// import { useState } from "react";
// import { createUser } from "../../services/apiServices";
// import toast from "react-hot-toast";
// import { useDropdownContext } from "../../contexts/DropdownContext";

// const CreateUser = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     //password: "",
//     role: "",
//     employeeId: "",
//     departmentId: "",
//   });

//   const { departments} = useDropdownContext();

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const res = await createUser(formData);
//       toast.success(res || "User created successfully");
//       setFormData({
//         email: "",
//         //password: "",
//         role: "",
//         employeeId: "",
//         departmentId: "",
//       });
//     } catch (error) {
//       toast.error(error.message || "Failed to create user");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-sm bg-white shadow-md rounded-xl p-6 space-y-4"
//     >
//       <h2 className="text-xl font-semibold text-center text-gray-800">
//         Create User
//       </h2>

//       <div className="space-y-1">
//         <label className="text-sm text-gray-700">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//           placeholder="user@example.com"
//         />
//       </div>

//       {/* <div className="space-y-1">
//         <label className="text-sm text-gray-700">Password</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//         />
//       </div> */}

//       <div className="space-y-1">
//         <label className="text-sm text-gray-700">Role</label>
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           required
//           className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//         >
//           <option value="">-- Select Role --</option>
//           <option value="ADMIN">Admin</option>
//           <option value="AUDITOR">Audit</option>
//           <option value="FINANCE">Finance</option>
//           <option value="IT_SUPPORT">IT Support</option>
//           <option value="CORPORATE_SERVICE">Corporate Service</option>
//           <option value="INTERNAL_CONTROL">Internal Control</option>
//         </select>
//       </div>

//       <div className="space-y-1">
//         <label className="text-sm text-gray-700">Employee ID</label>
//         <input
//           type="text"
//           name="employeeId"
//           value={formData.employeeId}
//           onChange={handleChange}
//           required
//           className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//           placeholder="EMP001"
//         />
//       </div>

//       <div className="space-y-1">
//         <label className="text-sm text-gray-700">Department</label>
//         <select
//           name="departmentId"
//           value={formData.departmentId}
//           onChange={handleChange}
//           required
//           className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//         >
//           <option value="">-- Select Department --</option>
//           {departments?.map((dept) => (
//             <option key={dept.departmentId} value={dept.departmentId}>
//               {dept.departmentName}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className={`w-full py-2 text-sm rounded-md text-white font-medium ${isSubmitting
//           ? "bg-blue-400 cursor-not-allowed"
//           : "bg-blue-600 hover:bg-blue-700"
//           } transition duration-200`}
//       >
//         {isSubmitting ? "Creating..." : "Create"}
//       </button>
//     </form>
//   );
// };

// export default CreateUser;

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { createUser } from "../../services/apiServices";
import { useDropdownContext } from "../../contexts/DropdownContext";
import UsersTable from "../UsersTable";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    role: "",
    employeeId: "",
    departmentId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { departments } = useDropdownContext();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await createUser(formData);
      toast.success(res || "User created successfully");

      setFormData({
        email: "",
        role: "",
        employeeId: "",
        departmentId: "",
      });
    } catch (error) {
      toast.error(error.message || "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* FORM */}
      <div className="mb-10">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B0F0] focus:outline-none"
              placeholder="user@example.com"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B0F0] focus:outline-none"
              required
            >
              <option value="">Select role</option>
              <option value="ADMIN">Admin</option>
              <option value="AUDITOR">Audit</option>
              <option value="FINANCE">Finance</option>
              <option value="IT_SUPPORT">IT Support</option>
              <option value="CORPORATE_SERVICE">Corporate Service</option>
              <option value="INTERNAL_CONTROL">Internal Control</option>
            </select>
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.employeeId}
              onChange={(e) => handleInputChange("employeeId", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B0F0] focus:outline-none"
              placeholder="EMP001"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.departmentId}
              onChange={(e) =>
                handleInputChange("departmentId", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B0F0] focus:outline-none"
              required
            >
              <option value="">Select department</option>
              {departments?.map((dept) => (
                <option key={dept.departmentId} value={dept.departmentId}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-full flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer flex justify-center items-center gap-2 bg-[#00B0F0] text-white 
               font-semibold py-3 px-6 rounded-lg hover:bg-[#0090c0] transition disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Creating...
                </>
              ) : (
                "Create User"
              )}
            </button>
          </div>
        </form>
      </div>
      <UsersTable />
    </div>
  );
};

export default CreateUser;
