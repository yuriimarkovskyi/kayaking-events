import React from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Typography } from 'antd';
import { useAppSelector } from '../hooks/useAppSelector';
import EventSlider from '../components/Event/EventSlider';
import EventInformation from '../components/Event/EventInformation';

function Event(): JSX.Element {
  const { Title } = Typography;
  const { link } = useParams();

  const events = useAppSelector((state) => state.events);
  const currentEvent = events.filter((el) => el.link === link);

  return (
    <Container>
      {currentEvent.map((el) => (
        <Title key={el.title} className="title" level={2}>
          {el.title}
        </Title>
      ))}
      <Row>
        <Col lg={12} xl={6}>
          <EventSlider />
        </Col>
        <Col lg={12} xl={6}>
          <EventInformation />
        </Col>
      </Row>
    </Container>
  );
}

export default Event;
