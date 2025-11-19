import React from "react";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  children,
  isLoading,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-[1px] z-50">
      <div className="bg-white rounded-2xl shadow-lg w-auto p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6 whitespace-nowrap text-sm">
          {message}
        </p>

        {/* Extra content (like checkbox/select) */}
        {children && <div className="mb-6">{children}</div>}

        <div className="flex justify-end gap-3">
          <button
            className="px-4 cursor-pointer py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 cursor-pointer rounded-lg bg-[#00B0F0] text-white hover:bg-[#00B0F0]"
            onClick={onConfirm}
          >
            {isLoading ? "Confirming..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
