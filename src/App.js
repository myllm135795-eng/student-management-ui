import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import ChatbotPanel from './components/ChatbotPanel';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleStudentSaved = () => {
    setRefreshTrigger(prev => prev + 1);
    setEditingStudent(null);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="App">
      <Container fluid className="container-main">
        <Row className="mb-4">
          <Col>
            <h1 className="text-center mb-4" style={{ color: '#333', fontWeight: 'bold' }}>
              📚 Student Management System
            </h1>
          </Col>
        </Row>
        
        <Row>
          <Col lg={4} md={5} className="mb-4">
            <StudentForm 
              onStudentSaved={handleStudentSaved}
              editingStudent={editingStudent}
              onCancelEdit={handleCancelEdit}
            />
          </Col>
          
          <Col lg={8} md={7}>
            <StudentList 
              refreshTrigger={refreshTrigger}
              onEditStudent={handleEditStudent}
              onStudentDeleted={handleStudentSaved}
            />
          </Col>
        </Row>
      </Container>
      
      {/* AI Chatbot Panel */}
      <ChatbotPanel />
      
      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
