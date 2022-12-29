import React from "react";

interface proptypes {
  done: boolean;
  onClick: () => void;
}
function TodoCheckBox(props: proptypes) {
  return (
    <>
      {props.done ? (
        <img
          src="./icon-check.svg"
          className="checkBox"
          alt=""
          onClick={() => {
            props.onClick();
          }}
        />
      ) : (
        <div
          style={{
            padding: "4px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            border: "1px solid lightblue",
          }}
        ></div>
      )}
    </>
  );
}

export default TodoCheckBox;
