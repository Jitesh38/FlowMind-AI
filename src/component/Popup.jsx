import React from "react";
import { useState } from "react";

function Popup({
  title = "jitesh",
  inputType = "text",
  inputPlaceholder = "Enter your name",
  buttonText = "Submit",
  onSubmit,
  onCancel,
}) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-lg w-full mx-4 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          onClick={onCancel}
          aria-label="Close"
          type="button"
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold mb-4">{title}</h1>

        <input
          type={inputType}
          placeholder={inputPlaceholder}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            if (inputType !== "hidden") {
              if (inputValue !== null && inputValue.trim().length !== 0) {
                onSubmit(inputValue);
                setInputValue("");
              } else {
                alert("Enter proper data");
              }
            } else {
              onSubmit();
            }
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Popup;
