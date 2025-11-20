import React from "react";
import CreateUser from "../../components/CreateUser/CreateUser";

const CreateUserPage = () => {
  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center p-6">
      <div className="w-full max-w-6xl rounded-2xl p-10 border border-gray-100">
        <CreateUser />
      </div>
    </div>
  );
};

export default CreateUserPage
