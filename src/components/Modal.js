import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";

const ModalShow = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return ReactDOM.createPortal(
    <div onClick={props.onDismiss}>
      <Modal
        onClick={(e) => e.stopPropagation()}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>{props.actions}</Modal.Footer>
      </Modal>
    </div>,
    document.querySelector("#modal")
  );
};

export default ModalShow;
