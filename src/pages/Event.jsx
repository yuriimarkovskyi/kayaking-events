import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Title from '../components/UI/Title';
import EventSlider from '../components/EventSlider';
import EventInformation from '../components/EventInformation';

function Event() {
  const { name } = useParams();
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((item) => item.name === name);

  return (
    <>
      <Row>
        <Col>
          {currentEvent.map((item) => (
            <Title key={item.title}>
              {item.title}
            </Title>
          ))}
        </Col>
      </Row>
      <Row>
        <Col lg={12} xl={5}>
          <EventSlider name={name} />
        </Col>
        <Col lg={12} xl={7}>
          <EventInformation name={name} />
        </Col>
      </Row>
    </>
  );
}

export default Event;
