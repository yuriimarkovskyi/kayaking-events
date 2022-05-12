import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Title from '../components/UI/Title';
import EventSlider from '../components/EventSlider';
import EventInformation from '../components/EventInformation';

function EventPage() {
  const { link } = useParams();
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((el) => el.link === link);

  return (
    <>
      <Helmet>
        {currentEvent.map((el) => (
          <title key={el.title}>
            {el.title}
          </title>
        ))}
      </Helmet>
      <Row>
        <Col>
          {currentEvent.map((el) => (
            <Title key={el.title}>
              {el.title}
            </Title>
          ))}
        </Col>
      </Row>
      <Row>
        <Col lg={12} xl={5}>
          <EventSlider />
        </Col>
        <Col lg={12} xl={7}>
          <EventInformation />
        </Col>
      </Row>
    </>
  );
}

export default EventPage;
