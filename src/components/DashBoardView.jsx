import React, { useContext } from 'react'
import { Building, Hash, Mail, Shield, User } from "lucide-react";
import { AuthContext } from '../contexts/AuthContext';
const DashBoardView = () => {
    const { user } = useContext(AuthContext);
    
  return (
     <div className="main-dashboard">
         <div className="rounded-t-2xl">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative rounded-2xl">
            <div className="absolute -bottom-8 left-8">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <User className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="pt-12 pb-8 px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">User Profile</h2>
                <p className="text-gray-600">Complete profile information</p>
              </div>              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                    <p className="text-gray-900 font-medium">{user?.username}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">User Role</p>
                    <p className="text-gray-900 font-medium">{user?.role}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Hash className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Employee ID</p>
                    <p className="text-gray-900 font-medium">{user?.employeeId}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Building className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Department</p>
                    <p className="text-gray-900 font-medium">{user?.department}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  )
}

export default DashBoardView
