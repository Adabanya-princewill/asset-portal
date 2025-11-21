// export const Cards = ({ title, number, onClick, isActive }) => {
//   return (
//     <div
//       onClick={onClick}
//       className={`cursor-pointer rounded-lg p-4 m-2 w-full max-w-xs transition-colors duration-200 ${
//         isActive ? 'bg-blue-600 text-white' : 'bg-[#f9fafb] hover:bg-[#e3e3e3]'
//       }`}
//     >
//       <div className="text-sm font-medium">{title}</div>
//       <div className="text-2xl font-bold">{number}</div>
//     </div>
//   );
// };

export const Cards = ({ title, number, onClick, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-xl border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 
        ${isActive ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{number}</p>
    </div>
  );
};

 
