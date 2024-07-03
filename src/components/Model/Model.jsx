import React from 'react';
import Modal from 'react-modal';
import './Model.css';

Modal.setAppElement('#root');

const AddNewItemModal = ({ isOpen, onRequestClose, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Item"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Add New Template</h2>
      <form onSubmit={onSubmit} className="modal-form">
        <label>
          Name:
          <input type="input" name="name" required />
        </label>
        <label>
          Description:
          <input type="text" name="description" required />
        </label>
        <label>
          Content:
          <input style = {{
        width: '100%',
        height: '200px',
        padding: '10px',
        fontFamily: 'monospace',
        fontSize: '14px',
        lineHeight: '1.5',
        resize: 'vertical', // Allow vertical resizing if needed
        overflowY: 'scroll',
    }} type="text" name="content" 
                 required />
        </label>
        <div className="modal-buttons">
          <button type="button" className="close-button" onClick={onRequestClose}>Close</button>
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewItemModal;
