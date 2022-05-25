import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
import EventSlider from '../components/EventSlider';
import EventInformation from '../components/EventInformation';

function Event() {
  const { Title } = Typography;
  const { link } = useParams();

  const events = useSelector((state) => state.events);
  const currentEvent = events.filter((el) => el.link === link);

  return (
    <Container>

      <Helmet>
        {currentEvent.map((el) => (
          <title key={el.title}>
            {el.title}
          </title>
        ))}
      </Helmet>

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
