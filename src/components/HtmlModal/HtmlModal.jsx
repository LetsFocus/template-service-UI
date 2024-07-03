import React, { useState } from 'react';
import Modal from 'react-modal';
import './HtmlModal.css';

const RenderHtmlModal = ({ isOpen, onRequestClose, content }) => {
  const [showRawHtml, setShowRawHtml] = useState(false);

  const toggleHtmlView = () => {
    setShowRawHtml(!showRawHtml);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Render HTML"
      className="html-Modal"
      overlayClassName="Overlay"
    >
      <h2>Render HTML</h2>
      <button onClick={toggleHtmlView} className="toggle-view-button">
        {showRawHtml ? 'Show Rendered HTML' : 'Show Raw HTML'}
      </button>
      {showRawHtml ? (
        <pre className="raw-html"><code>{content}</code></pre>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} className="rendered-html"></div>
      )}
      <button onClick={onRequestClose} className="close-button">Close</button>
    </Modal>
  );
};

export default RenderHtmlModal;
