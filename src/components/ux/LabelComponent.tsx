import React from "react";

const LabelComponent = ({ text = "Label" }: { text: string }) => {
  return (
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {text}
    </label>
  );
};

export default LabelComponent;
