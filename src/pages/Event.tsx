import React from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Typography } from 'antd';
import EventSlider from 'components/EventSlider';
import EventInformation from 'components/EventInformation';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { IEvent } from 'types';
import { db } from 'config/firebase';

function Event() {
  const { Title } = Typography;
  const { link } = useParams();

  const [events] = useListVals<IEvent>(ref(db, 'events'));
  const currentEvent = events?.filter((val) => val.link === link);

  return (
    <Container>
      {currentEvent?.map((val) => (
        <Title key={val.title} className="title" level={2}>
          {val.title}
        </Title>
      ))}
      <Row>
        <Col xl={10} lg={8} className="mx-auto">
          <EventSlider />
        </Col>
      </Row>
      <Row>
        <Col xl={10} lg={8} className="mx-auto">
          <EventInformation />
        </Col>
      </Row>
    </Container>
  );
}

export default Event;
