import React from 'react';
import { Card, Row, Col} from 'react-bootstrap';
import './RecentlyUpdated.css';

const RecentlyUpdated = () => {

  return (
    <div className="recently-updated">

        <h1>Recently Updated</h1>

        <div className="recently-updated-list">
          <Row>
          {Array.from({ length: 18 }).map((_, idx) => (
            <Col sm={2}>
              <Card>
                <Card.Img variant="top" src="./images/anya-poster.png" />
                <Card.Body style={{padding:"0.5em"}}>
                  <Card.Title>Anime</Card.Title>
                  <Card.Text>
                  <div>
                    Episode x
                  </div>
                  <div>
                    x Hours ago
                  </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            ))}
          </Row>
        </div>
    </div>
  );
};

export default RecentlyUpdated;