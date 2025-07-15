import React from "react";
import CreateUser from "../../components/CreateUser/CreateUser";

const CreateUserPage = () => {
  return (
    <div style={{ height: '85vh' }} className='bg-[#faf9f9] h-screen rounded-2xl p-10 flex items-center justify-center'>
      <CreateUser />
    </div>
  );
};

export default CreateUserPage
