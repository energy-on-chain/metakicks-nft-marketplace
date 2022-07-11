
import React, { useState, forwardRef, useImperativeHandle } from "react";
import '../../assets/scss/core/elements/_snackbar.scss';

const Snackbar = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  let background = null;
  let textColor = null;

  switch (props.type) {
    case "success": 
        background = "green";
        textColor= "white";
        break;
    case "wait":
        background = "purple";
        textColor= "white";
        break;
    case "fail":
        background = "purple";
        textColor= "white";
        break;
    default:
        background = null
  }

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    },
  }));
  
  return (
    <div
      className="snackbar"
      id={showSnackbar ? "show" : "hide"}
      style={{
        backgroundColor: background,
        color: textColor,
      }}
    >
      <div className="message">{props.message}</div>
    </div>
  );
});

export default Snackbar;
