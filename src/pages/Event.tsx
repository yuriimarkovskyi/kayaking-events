import { Layout, Typography } from 'antd';
import EventInformation from 'components/EventInformation';
import EventSlider from 'components/EventSlider';
import MyContent from 'components/UI/MyContent';
import MyFooter from 'components/UI/MyFooter';
import MyHeader from 'components/UI/MyHeader';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useListVals } from 'react-firebase-hooks/database';
import { useParams } from 'react-router-dom';
import { IEvent } from 'types';

function Event() {
  const { link } = useParams();

  const { Title } = Typography;

  const [events] = useListVals<IEvent>(ref(db, 'events'));
  const currentEvent = events?.filter((event) => event.link === link);

  return (
    <Layout>
      <Container>
        <MyHeader />
        <MyContent>
          <Row>
            <Col xl={10} lg={8} className="mx-auto">
              {currentEvent?.map((event) => (
                <Title key={event.title} className="title">
                  {event.title}
                </Title>
              ))}
              <EventSlider />
              <EventInformation />
            </Col>
          </Row>
        </MyContent>
        <MyFooter />
      </Container>
    </Layout>
  );
}

export default Event;
