import React from "react";

const ShowInputError = (props) => {
  return (
    <p
      style={{
        color: "red",
        margin: "0",
        marginTop: "7px",
        marginLeft: "10px",
        padding: "0px",
        top: props.top ? props.top : null,
      }}
      className="help is-danger"
    >
      {props.children}*
    </p>
  );
};

export default ShowInputError;
