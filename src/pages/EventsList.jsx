import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Typography, Card } from 'antd';

function EventsList() {
  const { Title } = Typography;
  const { Meta } = Card;
  const events = useSelector((state) => state.events.events);

  return (
    <Container>
      <Helmet>
        <title>
          Список івентів
        </title>
      </Helmet>

      <Title className="title" level={2}>
        Оберіть івент, на який бажаєте зареєструватись
      </Title>
      <Row className="events-list">
        {events.map((event) => (
          <Col key={event.id} sm={12} lg={6} xl={4}>
            <Link to={`event/${event.link}`}>
              <Card
                hoverable
                cover={
                  <img src={event.imageCover} alt={event.name} />
                }
              >
                <Meta title={event.title} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default EventsList;
