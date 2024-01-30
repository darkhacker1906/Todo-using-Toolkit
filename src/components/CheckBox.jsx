import React from "react";

function CheckBox({ handleCheckBox, todoCheck }) {
  return (
    <div>
      <input type="checkbox" checked={todoCheck} onChange={handleCheckBox} />
    </div>
  );
}

export default CheckBox;
