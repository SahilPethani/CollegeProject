import React from "react";
import "../../App.css";

const Spinner = () => {

  return (
    <div className="main-ring">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>
    </div>
  );
};

export default Spinner;
