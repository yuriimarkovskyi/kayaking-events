import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import PageTitle from '../components/UI/PageTitle';
import EventListItem from '../components/EventListItem';

const StyledEventList = styled.div`
  .title {
    margin-bottom: 25px;
  }

  .items {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
`;

function EventList() {
  const events = useSelector((state) => state.events.events);

  return (
    <StyledEventList>
      <Container>
        <Row>
          <Col>
            <PageTitle className="title">
              Оберіть сплав, на який бажаєте зареєструватись
            </PageTitle>
          </Col>
        </Row>
        <div className="items">
          {events.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))}
        </div>
      </Container>
    </StyledEventList>
  );
}

export default EventList;
