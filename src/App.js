import React, { useState } from 'react';
import { Route, Routes ,useLocation} from 'react-router-dom';
import Sidebar from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import Table from './components/Table/Table';
import './App.css';
import AddNewItemModal from './components/Model/Model';


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MainContent = ({query,handleAddNew}) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/template/${id}`, {
        method: 'DELETE',
        headers:{
          tenantId:"fd39d176-4c81-41ec-9f47-87a8b05e7eed"
        }
      });

      if (response.ok) {
        console.log('Item deleted successfully');
      } else {
        console.error('Failed to delete the item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="main-content">
      <Header onAddNew={handleAddNew} />
      <Table query={query} onDelete={handleDelete}/>
    </div>
  );
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const query = useQuery();
  const serviceParam = query.get('service');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, description, content } = event.target.elements;

    const data = {
      name: name.value,
      description: description.value,
      content: content.value,
      service:serviceParam
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/template`, {
        method: 'POST',
        headers: {
          "tenantId":"fd39d176-4c81-41ec-9f47-87a8b05e7eed",
                    'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        closeModal();
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

      <div className="App">
        <Sidebar />
        <Routes>
        <Route path="/template" element={<MainContent query={serviceParam} handleAddNew={handleAddNew}/>} />
        </Routes>
        <AddNewItemModal
          isOpen={isModalOpen} 
          onRequestClose={closeModal} 
          onSubmit={handleSubmit} 
        />
      </div>
 
  );
}

export default App;
