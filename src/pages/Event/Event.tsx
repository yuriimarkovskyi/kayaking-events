import { PageHeader } from 'antd';
import MyLayout from 'components/layout/MyLayout';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import EventInformation from 'pages/Event/components/EventInformation';
import EventSlider from 'pages/Event/components/EventSlider';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useListVals } from 'react-firebase-hooks/database';
import { useNavigate, useParams } from 'react-router-dom';
import { IEvent } from 'types';

function Event() {
  const { link } = useParams();
  const navigate = useNavigate();

  const [events] = useListVals<IEvent>(ref(db, 'events'));
  const currentEvent = events?.filter((event) => event.link === link);

  return (
    <MyLayout>
      <Row>
        <Col xl={10} lg={8} className="mx-auto">
          {currentEvent?.map((event) => (
            <PageHeader
              key={event.title}
              className="title"
              onBack={() => navigate(-1)}
              title={event.title}
            />
          ))}
          <EventSlider />
          <EventInformation />
        </Col>
      </Row>
    </MyLayout>
  );
}

export default Event;
