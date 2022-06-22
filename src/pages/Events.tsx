import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Card, Typography } from 'antd';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { IEvent } from 'types';
import { db } from 'config/firebase';
import Loader from 'components/Loader';

function Events() {
  const { Title } = Typography;
  const { Meta } = Card;

  const [events, loading, error] = useListVals<IEvent>(ref(db, 'events'));

  if (loading) return <Loader />;
  if (error) console.error(error);

  return (
    <Container className="events">
      <Title className="title" level={3}>
        Оберіть подію, на яку бажаєте зареєструватись
      </Title>
      <Row className="events__row">
        {events?.map((val) => (
          <Col key={val.key} sm={12} lg={6} xl={4}>
            <Link to={`event/${val.link}`}>
              <Card
                className="events__card"
                hoverable
                cover={<img src={val.cover} alt={val.title} />}
              >
                <Meta title={val.eventName} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Events;
