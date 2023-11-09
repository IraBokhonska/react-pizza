import React from "react";

type CustomModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const CustomModal: React.FC<CustomModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <p>{message}</p>
        <div className="modal__buttons">
          <button className="button" onClick={onConfirm}>
            Так
          </button>
          <button className="button" onClick={onCancel}>
            Ні
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
