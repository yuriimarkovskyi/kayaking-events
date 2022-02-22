import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import PageTitle from '../components/UI/PageTitle';
import EventPageSlider from '../components/EventPageSlider';
import EventPageInformation from '../components/EventPageInformation';

const StyledEventPage = styled.div`
  .title {
    margin-bottom: 25px;
  }
`;

function EventPage() {
  const { name } = useParams();
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((item) => item.name === name);

  return (
    <StyledEventPage>
      <Container>
        <Row>
          <Col>
            {currentEvent.map((item) => (
              <PageTitle
                key={item.title}
                className="title"
              >
                {item.title}
              </PageTitle>
            ))}
          </Col>
        </Row>
        <Row>
          <Col lg={12} xl={5}>
            <EventPageSlider name={name} />
          </Col>
          <Col lg={12} xl={7}>
            <EventPageInformation name={name} />
          </Col>
        </Row>
      </Container>
    </StyledEventPage>
  );
}

export default EventPage;
