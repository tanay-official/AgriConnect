import React, { useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (paymentMethod: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleConfirm = () => {
    if (selectedMethod) {
      onConfirm(selectedMethod);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold text-green-700">
          Select Payment Method
        </h2>

        <div className="space-y-3">
          {["bKash", "Nagad", "Cash on Delivery"].map((method) => (
            <label
              key={method}
              className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                selectedMethod === method ? "border-green-500 bg-green-50" : ""
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={selectedMethod === method}
                onChange={() => setSelectedMethod(method)}
                className="mr-3"
              />
              {method}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            disabled={!selectedMethod}
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
