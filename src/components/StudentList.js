import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import studentService from '../services/studentService';

const StudentList = ({ refreshTrigger, onEditStudent, onStudentDeleted }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [refreshTrigger]);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch students';
      setError(errorMessage);
      toast.error(errorMessage, {
        position: 'bottom-right',
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    onEditStudent(student);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }

    setDeleting(id);
    try {
      await studentService.deleteStudent(id);
      toast.success('Student deleted successfully!', {
        position: 'bottom-right',
        autoClose: 3000
      });
      fetchStudents();
      onStudentDeleted();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete student';
      toast.error(errorMessage, {
        position: 'bottom-right',
        autoClose: 3000
      });
    } finally {
      setDeleting(null);
    }
  };

  if (loading && students.length === 0) {
    return (
      <Card className="shadow-sm">
        <Card.Header className="card-header-custom">
          <Card.Title className="mb-0">👥 Students List</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="loader">
            <Spinner animation="border" role="status" className="me-2">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span>Loading students...</span>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Header className="card-header-custom">
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title className="mb-0">👥 Students List</Card.Title>
          <span className="badge bg-light text-dark">{students.length} Students</span>
        </div>
      </Card.Header>
      <Card.Body>
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible className="error-alert">
            <strong>Error!</strong> {error}
          </Alert>
        )}

        {students.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📭</div>
            <p>No students found. Add a new student to get started!</p>
            <small className="text-muted">Use the form on the left to add your first student</small>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="student-table mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{student.name}</strong>
                    </td>
                    <td>
                      <a href={`mailto:${student.email}`} className="text-decoration-none">
                        {student.email}
                      </a>
                    </td>
                    <td>
                      <span className="badge bg-info text-dark">{student.course}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(student)}
                          disabled={deleting === student.id}
                          title="Edit student"
                        >
                          ✏️ Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(student.id)}
                          disabled={deleting === student.id}
                          title="Delete student"
                        >
                          {deleting === student.id ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              Deleting...
                            </>
                          ) : (
                            '🗑️ Delete'
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default StudentList;
