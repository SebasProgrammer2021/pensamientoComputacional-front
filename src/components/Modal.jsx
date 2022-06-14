import React from "react";

const Modal = ({ config, setAlert }) => {
  return (
    <div
      id="overlay"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {config?.title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setAlert({ show: false, Title: "", message: "" });
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{config.message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => {
                setAlert({ show: false, Title: "", message: "" });
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
