import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import studentService from '../services/studentService';

const StudentForm = ({ onStudentSaved, editingStudent, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        email: editingStudent.email,
        course: editingStudent.course
      });
    } else {
      setFormData({ name: '', email: '', course: '' });
    }
    setErrors({});
  }, [editingStudent]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (editingStudent) {
        await studentService.updateStudent(editingStudent.id, formData);
        toast.success('Student updated successfully!', {
          position: 'bottom-right',
          autoClose: 3000
        });
      } else {
        await studentService.createStudent(formData);
        toast.success('Student added successfully!', {
          position: 'bottom-right',
          autoClose: 3000
        });
      }
      setFormData({ name: '', email: '', course: '' });
      onStudentSaved();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error saving student';
      toast.error(errorMessage, {
        position: 'bottom-right',
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', course: '' });
    setErrors({});
    onCancelEdit();
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="card-header-custom">
        <Card.Title className="mb-0">
          {editingStudent ? '✏️ Edit Student' : '➕ Add New Student'}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter student name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter student email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Course</Form.Label>
            <Form.Control
              type="text"
              name="course"
              placeholder="Enter course name"
              value={formData.course}
              onChange={handleChange}
              isInvalid={!!errors.course}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.course}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="btn-custom"
            >
              {loading ? 'Saving...' : editingStudent ? 'Update Student' : 'Add Student'}
            </Button>

            {editingStudent && (
              <Button
                variant="secondary"
                onClick={handleCancel}
                disabled={loading}
                className="btn-custom"
              >
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default StudentForm;
