import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
  const data = [
    { title: 'Match Percentage', value: 75 },
    { title: 'Keywords Matched', value: '15/20' },
    { title: 'Resume Score', value: 85 }
  ];

  const getCardStyle = (value) => {
    if (typeof value === 'number') {
      if (value >= 80) return { backgroundColor: '#d4edda' }; // green
      if (value >= 60) return { backgroundColor: '#fff3cd' }; // amber
      return { backgroundColor: '#f8d7da' }; // red
    }
    return {};
  };

  return (
    <Container>
      <Row className="mt-5">
        {data.map((item, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card style={getCardStyle(item.value)}>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.value}{typeof item.value === 'number' ? '%' : ''}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
