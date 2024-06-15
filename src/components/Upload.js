import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { jobRoles } from '../data/jobRoles';

const Upload = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [selectedJobRole, setSelectedJobRole] = useState('');
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobRole', selectedJobRole);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formJobRole">
                <Form.Label>Select Job Role</Form.Label>
                <Form.Control 
                  as="select" 
                  value={selectedJobRole} 
                  onChange={(e) => setSelectedJobRole(e.target.value)}
                >
                  <option value="">Select a job role...</option>
                  {Object.keys(jobRoles).map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formResume">
                <Form.Label>Upload Resume</Form.Label>
                <Form.Control type="file" onChange={(e) => setResume(e.target.files[0])} />
              </Form.Group>

              <Form.Group controlId="formJobDescription">
                <Form.Label>Job Description</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={5} 
                  value={jobDescription} 
                  onChange={(e) => setJobDescription(e.target.value)} 
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            {results && (
              <div className="mt-4">
                <h4>Results</h4>
                <p>Match Percentage: {results.matchPercentage}%</p>
                <p>Keywords Matched: {results.matchedKeywords}/{results.totalKeywords}</p>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Upload;
