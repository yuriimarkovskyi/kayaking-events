import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';

import EventSlider from '../components/EventSlider';
import EventInformation from '../components/EventInformation';

function EventPage() {
  const { Title } = Typography;
  const { link } = useParams();
  const events = useSelector((state) => state.events.events);
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
      <Row>
        <Col>
          {currentEvent.map((el) => (
            <Title key={el.title} className="title" level={2}>
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
    </Container>
  );
}

export default EventPage;
