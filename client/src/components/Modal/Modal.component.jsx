import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

import { Button } from "components/Button";

import { ReactComponent as CloseModal } from "icons/close-modal.svg";

import classes from "./Modal.module.css";

const modalRoot = document.getElementById("modalRoot");

export const Modal = ({ children, onClose }) => {
  const handleKeyDown = useCallback(
    ({ code }) => {
      if (code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = ({ currentTarget, target }) => {
    if (currentTarget === target) {
      onClose();
    }
  };

  return createPortal(
    <div className={classes.overlay} onClick={handleBackdropClick}>
      <div className={classes.modal}>
        <Button
          onClick={onClose}
          aria-label="Close"
          type="button"
          extraClassName={classes["close-icon"]}
        >
          <CloseModal width="21" height="21" fill="#fff" />
        </Button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
