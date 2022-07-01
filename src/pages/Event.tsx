import { Typography } from 'antd';
import EventInformation from 'components/EventInformation';
import EventSlider from 'components/EventSlider';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useListVals } from 'react-firebase-hooks/database';
import { useParams } from 'react-router-dom';
import { IEvent } from 'types';

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
