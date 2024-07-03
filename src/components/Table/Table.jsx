import React, { useEffect, useState } from 'react';
import './Table.css';
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import RenderHtmlModal from '../HtmlModal/HtmlModal';


const Table = ({ query,onDelete }) => {
  const [data, setData] = useState([]);
  const [isRenderHtmlModalOpen, setIsRenderHtmlModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState('');
  const [deleted, isDeleted]=useState(false);

  const handleHtmlClick = (content) => {
    setSelectedContent(content);
    setIsRenderHtmlModalOpen(true);
  };

  const closeRenderHtmlModal = () => {
    setIsRenderHtmlModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/template?service=${query}&universal=false`, {
          headers: {
            "tenantId": "fd39d176-4c81-41ec-9f47-87a8b05e7eed"
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query, deleted]);

 

  const getTruncatedContent = (content) => {
    const lines = content.split('\n');
    if (lines.length > 3) {
      return lines.slice(0, 3).join('\n') + '...';
    }
    return content;
  };

  const handleDeleteClick = (id) => {
    onDelete(id);
    isDeleted(!deleted);
  };

  return (
    <>
    <table className="items-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Content</th>
          <th>Last Updated</th>
          <th>Personal</th>
        </tr>
      </thead>
      <tbody>
        {data!=null && data.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td  className="code-preview" style={{cursor: 'pointer'} }
                  onClick={() => handleHtmlClick(item.content)}>    
                  <pre>
                    <code>{getTruncatedContent(item.content)}</code>
                  </pre>
              </td>    
            <td>{item.updated_at}</td>
            <td>{item.universal ? 'No' : 'Yes'}</td>
            { (!item.universal)?
            <div className='edit-btn'>
              <button><AiOutlineEdit /></button>
             <button onClick={() => handleDeleteClick(item.id)}><MdDelete /></button>
            </div>
            :null}
          </tr>
        ))}
      </tbody>
    </table>
    <RenderHtmlModal 
        isOpen={isRenderHtmlModalOpen} 
        onRequestClose={closeRenderHtmlModal} 
        content={selectedContent} 
      />
    </>
  );
};

export default Table;
