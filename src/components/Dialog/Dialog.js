import React from 'react';

const Dialog = ({ onClose, children }) => {
  return (
    <div className="dialog-container">
      <dialog open onClose={onClose}>
        <div className="child-component">{children}</div>
        <button onClick={onClose}>close</button>
      </dialog>
    </div>
  );
};

export default Dialog;
